import debug from 'debug';
import { red, green, blue } from 'chalk';

const log = debug('app-routes');

// Routes
const userRoutes = require('./api/user/user.routes').default;

export default (app) => {
  // logger
  app.use((req, res, next) => {
    log(`${blue(new Date().toISOString())} [${red(req.method)}] ${green(req.url)}`);
    next();
  });

  // Insert routes below
  app.use('/api/user', userRoutes);
};
