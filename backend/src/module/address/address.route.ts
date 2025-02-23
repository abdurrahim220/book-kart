import { Router } from 'express';
import { auth } from '../../middleware/verifyUser';
import { addressController } from './address.controller';

const router = Router();

router.post(
  '/',
  auth('admin', 'buyer', 'seller'),
  addressController.addOrUpdateAddress,
);

export const AddressRoute = router;
