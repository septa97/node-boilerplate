import express from 'express';
import passport from 'passport';
import validate from 'express-validation';
import * as controller from './auth.controller';
import validation from './auth.validation';
import wrapAsync from './../../helpers/wrapAsync';

const router = express.Router();
const passportLocal = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// GET
router.get('/logout', passportJWT, wrapAsync(controller.logout));

// POST
router.post(
  '/login',
  validate(validation.login),
  passportLocal,
  wrapAsync(controller.login),
);

// PUT

// DELETE

export default router;
