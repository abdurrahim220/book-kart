import express from 'express';

import { auth } from '../../middleware/verifyUser';
import { ProductController } from './product.controller';
import { fileUpload } from '../../utils/uploadToCloudinary';

const router = express.Router();

router.post(
  '/create',
  auth('seller'),
  fileUpload.uploadProductImages,
  fileUpload.formatCloudinaryResponse,
  ProductController.createProduct,
);

export const ProductRoute = router;
