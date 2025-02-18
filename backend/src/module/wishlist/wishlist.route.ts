import express from 'express';
import { WishListController } from './wishlist.controller';
import { auth } from '../../middleware/verifyUser';

const router = express.Router();

router.post(
  '/add',
  auth('buyer', 'admin', 'seller'),
  WishListController.addToWishList,
);
router.get(
  '/',
  auth('buyer', 'admin', 'seller'),
  WishListController.getWishList,
);
router.delete(
  '/:productId',
  auth('buyer', 'admin', 'seller'),
  WishListController.deleteFromWishList,
);

export const WishListRoutes = router;
