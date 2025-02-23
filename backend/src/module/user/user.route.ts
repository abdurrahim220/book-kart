import { Router } from 'express';
import { UserController } from './user.controller';
import { auth } from '../../middleware/verifyUser';

const router = Router();

router.post('/create', UserController.createUser);
router.get('/verify-email/:token', UserController.verifyEmail);
router.get(
  '/single-user',
  auth('super-admin', 'admin', 'buyer', 'seller'),
  UserController.getUserByIdUser,
);
router.patch(
  '/update-user-role',
  auth('super-admin', 'admin'),
  UserController.updateUserRole,
);
// router.patch('/update-user', auth('super-admin', 'admin'), UserController.updateUser);

router.patch(
  '/update-user-status',
  auth('admin', 'super-admin'),
  UserController.updateUserStatus,
);

export const UserRoute = router;
