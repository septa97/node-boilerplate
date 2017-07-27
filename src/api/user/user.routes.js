import express from 'express';
import * as controller from './user.controller';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getUser);

export default router;
