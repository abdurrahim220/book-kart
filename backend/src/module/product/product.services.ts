import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: IProduct, sellerId: string) => {
  const productData = {
    ...payload,
    seller: sellerId,
  };

  const product = await Product.create(productData);

  return product;
};

export const ProductService = {
  createProduct,
};
