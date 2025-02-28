import { Router } from 'express';
import { CartController } from './cart.controller';
import { auth } from '../../middleware/verifyUser';

const router = Router();

router.post(
  '/',
 auth('buyer', 'seller', 'admin'),

  CartController.addToCart,
);
router.get('/', auth('buyer', 'seller', 'admin'), CartController.getCart);
router.delete(
  '/:id',
  auth('buyer', 'seller', 'admin'),
  CartController.deleteFromCart,
);

export const cartRoutes = router;
