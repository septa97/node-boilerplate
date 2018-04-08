import express from 'express';
// import compression from 'compression';
import cors from 'cors';
import path from 'path';
import HTTPStatus from 'http-status';
import methodOverride from 'method-override';
import debug from 'debug';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import expressValidation from 'express-validation';
import { MongoError } from 'mongodb';
import { APIClientError } from './helpers/APIResponse';

const app = express();
const log = debug('app'); // eslint-disable-line

// Load middlewares
app.use(cors());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(compression()); // Maybe add a filter later
app.use(helmet());

// Connect to MongoDB
let mongoURI;

if (!process.env.MONGO_USER && !process.env.MONGO_PASSWORD) {
  mongoURI = `mongodb://${process.env.MONGO_HOST}:${process.env
    .MONGO_PORT}/${process.env.MONGO_DATABASE}`;
} else {
  mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env
    .MONGO_DATABASE}@${process.env.MONGO_HOST}:${process.env
    .MONGO_PORT}/${process.env.MONGO_DATABASE}`;
}

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {
  useMongoClient: true,
});

// Serve the static files of code coverage
app.use('/coverage', express.static(path.join(__dirname, './../coverage')));

// Serve the static files of documentation
app.use('/docs/api', express.static(path.join(__dirname, './../docs/api')));
app.use(
  '/docs/source',
  express.static(path.join(__dirname, './../docs/source')),
);

// Load the routes
require('./routes').default(app);

// Handle ValidationError
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    return res.status(err.status).json(err);
  }

  return next(err);
});

// Handle AuthenticationError
app.use((err, req, res, next) => {
  if (err.name && err.name === 'AuthenticationError') {
    const response = new APIClientError(
      {
        message: 'Passport.js authentication failed.',
      },
      HTTPStatus.UNAUTHORIZED,
      HTTPStatus['401'],
    );

    return res.status(err.status).json(response.jsonify());
  }

  return next(err);
});

// Handle APIClientError
app.use((err, req, res, next) => {
  if (err instanceof APIClientError) {
    return res.status(err.status).json(err.jsonify());
  }

  return next(err);
});

// Handle MongoError
app.use((err, req, res, next) => {
  if (err instanceof MongoError) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Database error has occurred.',
    });
  }

  return next(err);
});

export default app;
