import { Router } from 'express';
import { UserRoute } from '../module/user/user.route';
import { AuthRoutes } from '../module/auth/auth.route';
import { ProductRoute } from '../module/product/product.router';

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
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
