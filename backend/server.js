const dotenv = require('dotenv').config({ path: './config.env' });
const mongooes = require('mongoose');

const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

/// mongo database config
mongooes
  .connect(
    process.env.DATABASE.replace(
      /<db_password>/,
      process.env.DATABASE_PASSWORD,
    ),
  )
  .then((con) => {
    console.log('database connected');
  });

// process.on("unhandledRejection", (err) => {
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
