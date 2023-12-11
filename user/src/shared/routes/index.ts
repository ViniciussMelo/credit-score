import { Router } from 'express';

import { assetRoutes } from './asset.routes';
import { debtRoutes } from './debt.routes';

const router = Router();

router.use('/asset', assetRoutes);
router.use('/debt', debtRoutes);

export { router };