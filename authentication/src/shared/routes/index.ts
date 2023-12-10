import { Router } from 'express';

import { authenticationRoutes } from './authentication.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use('/authentication', authenticationRoutes);
router.use('/user', userRoutes);

export { router };