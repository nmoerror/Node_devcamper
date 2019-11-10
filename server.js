const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({ path: './config/config.env' });
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

connectDB();

//Load files
const bootcamps = require('./routes/bootcamps');

const app = express();
//Parser cause of Middleware
app.use(express.json());

if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
