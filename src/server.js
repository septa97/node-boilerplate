import express from 'express';
import debug from 'debug';
import { green } from 'chalk';

const app = express();
const log = debug('server');
const PORT = process.env.PORT || 8000;

// Load the routes
require('./routes').default(app);

// Start the server
app.listen(PORT, () => log(`Server listening on port ${green(PORT)}`));

export default app;
