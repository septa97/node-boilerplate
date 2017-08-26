import express from 'express';
import validate from 'express-validation';
import * as controller from './user.controller';
import validation from './user.validation';

const router = express.Router();

router.get('/users', controller.getAll);
router.get('/user/:id', validate(validation.getUser), controller.getUser);

export default router;
