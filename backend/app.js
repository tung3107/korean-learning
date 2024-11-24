const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const courseRoute = require('./routes/courseRoute');
const userRoute = require('./routes/userRoute');
const lessonRoute = require('./routes/lessonRoute');
const exerciseRoute = require('./routes/exerciseRoute');
const registrationRoute = require('./routes/registrationRoute');

const globalErrorHandler = require('./controller/errorController');

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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

// undefined routes
app.all('*', (req, res, next) => {});

app.use(globalErrorHandler);

module.exports = app;
