import express from 'express';
import debug from 'debug';
import bodyParser from 'body-parser';
import { green } from 'chalk';

const app = express();
const log = debug('server');
const PORT = process.env.PORT || 8000;

// Load middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load the routes
require('./routes').default(app);

// Start the server
app.listen(PORT, () => log(`Server listening on port ${green(PORT)}`));

export default app;
