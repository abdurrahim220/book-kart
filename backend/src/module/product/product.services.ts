import status from 'http-status';
import ApiError from '../../error/ApiError';
import { IProduct, IUpdateProduct } from './product.interface';
import { Product } from './product.model';
import { v2 as cloudinary } from 'cloudinary';
const createProduct = async (payload: IProduct, sellerId: string) => {
  const productData = {
    ...payload,
    seller: sellerId,
  };

  const product = await Product.create(productData);

  return product;
};

const updateProduct = async (
  productId: string,
  payload: IUpdateProduct,
  sellerId: string,
): Promise<IProduct | null> => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError('Product not found', status.NOT_FOUND);
  }

  // Check ownership or admin access
  if (
    product.seller.toString() !== sellerId.toString() &&
    req.user.role !== 'admin'
  ) {
    throw new ApiError(
      'Not authorized to update this product',
      status.FORBIDDEN,
    );
  }

  // Handle image deletions
  if (payload.imagesToDelete && payload.imagesToDelete.length > 0) {
    await Promise.all(
      payload.imagesToDelete.map(async (publicId) => {
        await cloudinary.uploader.destroy(publicId);
      }),
    );

    product.images = product.images.filter(
      (img) => !payload.imagesToDelete?.includes(img),
    );

    delete payload.imagesToDelete;
  }

  // Handle new images (already uploaded via middleware)
  if (payload.images) {
    product.images = [...product.images, ...payload.images];
    delete payload.images;
  }

  // Update other fields
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { ...payload, $set: { images: product.images } },
    { new: true, runValidators: true },
  );

  return updatedProduct;
};

const deleteProduct = async (
  productId: string,
  userId: string,
  userRole: string,
): Promise<IProduct | null> => {
  // Find product first to get image URLs
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError('Product not found', status.NOT_FOUND);
  }

  // Authorization check
  if (product.seller.toString() !== userId.toString() && userRole !== 'admin') {
    throw new ApiError(
      'Not authorized to delete this product',
      status.FORBIDDEN,
    );
  }

  // Delete images from Cloudinary
  if (product.images.length > 0) {
    await Promise.all(
      product.images.map(async (imageUrl) => {
        try {
          // Extract public ID from URL (version folder included)
          const urlParts = imageUrl.split('/');
          const publicId = urlParts
            .slice(urlParts.indexOf('upload') + 1)
            .join('/')
            .split('.')[0];
          
          await cloudinary.uploader.destroy(publicId);
          console.log(`Deleted image: ${publicId}`);
        } catch (error) {
          console.error(`Failed to delete image: ${imageUrl}`, error);
        }
      })
    );
  }

  // Permanent deletion from database
  const deletedProduct = await Product.findByIdAndDelete(productId);

  return deletedProduct;
};

const getAllProducts = async () => {
  const products = await Product.find().populate('seller').populate('images');
  // .populate('reviews');
  return products;
};

const getSingleProducts = async ({ productId }: { productId: string }) => {
  const product = await Product.findById(productId)
    .populate('seller')
    .populate('images');
  return product;
};
const getSellerProducts = async ({ sellerId }: { sellerId: string }) => {
  const product = await Product.findById(sellerId)
    .populate('seller')
    .populate('images');
  return product;
};

export const ProductService = {
  createProduct,
  updateProduct,
  getAllProducts,
  getSellerProducts,
  getSingleProducts,
  deleteProduct,
};
