const multer = require('multer');

const multerStorage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/course');
  },
  filename: (req, file, callback) => {
    ///course_id-course_name-time.jpeg
    const extension = file.mimetype.split('/')[1];
    callback(null, `course_${req.params.id}_${Date.now()}.${extension}`);
  },
});
/// Check image or not
const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new AppError('Not an image! Please upload images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCoursePhoto = upload.single('cover_photo');
