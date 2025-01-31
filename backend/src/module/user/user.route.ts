import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.post('/', UserController.createUser);
router.get('/verify-email/:token', UserController.verifyEmail); // Add this route


export const UserRoute = router;
