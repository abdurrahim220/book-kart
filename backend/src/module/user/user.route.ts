import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/', UserController.createUser);
router.get('/verify-email/:token', UserController.verifyEmail);


export const UserRoute = router;
