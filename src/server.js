/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
import express from 'express';
// import compression from 'compression';
import cors from 'cors';
import methodOverride from 'method-override';
import debug from 'debug';
import HTTPStatus from 'http-status';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { green } from 'chalk';

const app = express();
const log = debug('server');
const PORT =
  process.env.NODE_ENV === 'testing' ? 3000 : process.env.PORT || 8000;

// Load middlewares
app.use(cors());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(compression()); // Maybe add a filter later
app.use(helmet());

// Connect to MongoDB
const mongoURI = `mongodb://${process.env.MONGO_HOST}/${process.env
  .MONGO_DATABASE}`;
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {
  useMongoClient: true,
});

// Load the routes
require('./routes').default(app);

// Error handler for express-validation
app.use((err, req, res, next) => {
  res.status(HTTPStatus.BAD_REQUEST).send(err);
});

// Start the server
app.listen(PORT, () => log(`Server listening on port ${green(PORT)}`));

export default app;
