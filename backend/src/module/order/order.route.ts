import { Router } from 'express';

import { auth } from '../../middleware/verifyUser';
import { OrderController } from './order.controller';

const router = Router();

router.post(
  '/',
  auth('buyer', 'seller', 'admin'),
  OrderController.createOrUpdateOrder,
);
router.get('/', auth('buyer', 'seller', 'admin'), OrderController.getAllOrders);
router.delete(
  '/:id',
  auth('buyer', 'seller', 'admin'),
  OrderController.getOrderById,
);

export const orderRoutes = router;
