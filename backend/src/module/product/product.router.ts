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

router.patch(
  '/update/:productId',
  auth('seller'),
  fileUpload.uploadProductImages,
  fileUpload.formatCloudinaryResponse,
  ProductController.updateProduct,
);

router.get('/', ProductController.getAllProducts);

router.get('/single-product/:productId', ProductController.getSingleProducts);
router.get('/seller-product/:sellerId', ProductController.getSellerProducts);

router.delete(
  '/:productId',
  auth('seller', 'admin'),
  // validateRequest(ProductValidations.deleteProductSchema),
  ProductController.deleteProduct,
);

export const ProductRoute = router;
