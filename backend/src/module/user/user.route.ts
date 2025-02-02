import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/create', UserController.createUser);
router.get('/verify-email/:token', UserController.verifyEmail);

export const UserRoute = router;
