const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const courseRoute = require('./routes/courseRoute');
const userRoute = require('./routes/userRoute');
const lessonRoute = require('./routes/lessonRoute');
const exerciseRoute = require('./routes/exerciseRoute');
const registrationRoute = require('./routes/registrationRoute');
const searchRoute = require('./routes/searchRoute');
const userProgressRoute = require('./routes/userProgressRoute');
const flashCardRoute = require('./routes/flashcardRoute');
const studyFlashCardRoute = require('./routes/studyFlashCardRoute');

const globalErrorHandler = require('./controller/errorController');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173', // URL frontend
    credentials: true, // Cho phép gửi cookie và thông tin xác thực
  }),
);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

// main routes
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/lessons', lessonRoute);
app.use('/api/v1/exercises', exerciseRoute);
app.use('/api/v1/register', registrationRoute);
app.use('/api/v1/search', searchRoute);
app.use('/api/v1/userprogress', userProgressRoute);
app.use('/api/v1/collection', flashCardRoute);
app.use('/api/v1/study', studyFlashCardRoute);

// undefined routes
app.all('*', (req, res, next) => {});

app.use(globalErrorHandler);

module.exports = app;
