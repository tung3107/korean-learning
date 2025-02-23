const catchHandle = require('../utils/catchHandle');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../model/userModel');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return (token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }));
};

const iparseCookieMySelf = (cookieHeaders) => {
  const cookiesString = cookieHeaders.trim().split('; ');
  let cookie = undefined;
  cookiesString.forEach((el) =>
    el.match(/\b(jwt=)/g) ? (cookie = el.split('=')[1]) : el,
  );
  return cookie;
};

const sentTokenCookie = (user, statusCode, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: 'lax', // jwt cannot be modified
  };
  if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true; // can only access http

  const token = signToken(user._id);
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
exports.signup = async (req, res, next) => {
  // 1) GET the body user information
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  // 2) sign token

  // 3) send token to client
  sentTokenCookie(user, 201, res);
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now()), // Cookie hết hạn ngay lập tức
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully!',
  });
};

exports.login = catchHandle(async (req, res, next) => {
  // 1/ get the email, password from body
  let { email, password } = req.body;

  /// 1.1 check email and password to see that have or not
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 401));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return next(new AppError('Wrong email or password input! Try again', 401));
  }
  user.password = undefined;

  sentTokenCookie(user, 200, res);
});

exports.protectRoute = catchHandle(async (req, res, next) => {
  //// 1,1 check if it has the Bearer authen
  // const cookie = iparseCookieMySelf(req.headers.cookie);
  const cookie = req.cookies.jwt;
  let token;
  if (cookie) {
    token = cookie;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logging in! Try again', 400));
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

  const freshUser = await User.findById(decode.id);
  if (!freshUser) {
    return next(
      new AppError('Token no longer belongs to user! Login again', 400),
    );
  }
  req.user = freshUser;
  next();
});

exports.restrictTo = (...noAllowedUser) => {
  return (req, res, next) => {
    if (noAllowedUser.includes(req.user.role)) {
      return next(new AppError('You have no access to this route', 403));
    }
    next();
  };
};

exports.changePassword = catchHandle(async (req, res, next) => {
  /// 1) Get password,...
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const passwordConfirm = req.body.passwordConfirm;

  const currentUser = await User.findById(req.user.id).select('+password');
  // 2) Check if old password is correct
  if (!currentUser.checkCorrectPassword(oldPassword, currentUser.password)) {
    return next(new AppError('Old password is not correct! Try again', 400));
  }

  currentUser.password = newPassword;
  currentUser.passwordConfirm = passwordConfirm;
  await currentUser.save();

  sentTokenCookie(currentUser, 201, res);
});
