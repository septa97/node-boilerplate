import debug from 'debug';
import { red, green, blue } from 'chalk';
import passportMiddleware from './passport'; // eslint-disable-line

// Routes
import userRoutes from './api/user/user.routes';
import authRoutes from './api/auth/auth.routes';

const log = debug('routes');

export default app => {
  // logger
  app.use((req, res, next) => {
    log(
      `${blue(new Date().toISOString())} [${red(req.method)}] ${green(
        req.url,
      )}`,
    );
    next();
  });

  // Insert routes below
  app.use('/api/user', userRoutes);
  app.use('/api/auth', authRoutes);
};
