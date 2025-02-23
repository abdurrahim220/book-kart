import { Router } from 'express';

import { UserRoute } from '../module/user/user.route';

import { AuthRoutes } from '../module/auth/auth.route';

import { ProductRoute } from '../module/product/product.router';

import { cartRoutes } from '../module/cart/cart.route';

import { WishListRoutes } from '../module/wishlist/wishlist.route';

import { orderRoutes } from '../module/order/order.route';
import { AddressRoute } from '../module/address/address.route';

const router = Router();

const moduleRouters = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/product',
    route: ProductRoute,
  },
  {
    path: '/cart',
    route: cartRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/wish-list',
    route: WishListRoutes,
  },
  {
    path: '/address',
    route: AddressRoute,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
