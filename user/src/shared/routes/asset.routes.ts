import { Router } from 'express';

import { AssetController } from '../../modules/assets/controllers/asset.controller';
import { ensureAuthenticated } from '../middleware/auth.middleware';

const assetController = new AssetController();

const assetRoutes = Router();

assetRoutes.post('/create', ensureAuthenticated, assetController.create.bind(assetController));

export { assetRoutes };