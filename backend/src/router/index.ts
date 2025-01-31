import { Router } from 'express';
import { UserRoute } from '../module/user/user.route';

const router = Router();
const moduleRouters = [
  {
    path: '/auth',
    route: UserRoute,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
