import express from 'express';
import passport from 'passport';
import validate from 'express-validation';
import * as controller from './user.controller';
import validation from './user.validation';
import wrapAsync from './../../helpers/wrapAsync';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', { session: false });

// GET
router.get('/', passportJWT, wrapAsync(controller.getAll));
router.get(
  '/:username',
  passportJWT,
  validate(validation.getUser),
  wrapAsync(controller.getUser),
);

// POST
router.post(
  '/register',
  validate(validation.register),
  wrapAsync(controller.register),
);

// PUT

// DELETE

export default router;
