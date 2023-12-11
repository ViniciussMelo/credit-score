import { Router } from 'express';

import { AssetController } from '../../modules/assets/controllers/asset.controller';
import { ensureAuthenticated } from '../middleware/auth.middleware';

const assetController = new AssetController();

const assetRoutes = Router();

assetRoutes.post('/create', ensureAuthenticated, assetController.create.bind(assetController));

assetRoutes.patch('/update/:id', ensureAuthenticated, assetController.update.bind(assetController));

assetRoutes.get('/getById/:id', ensureAuthenticated, assetController.getById.bind(assetController));
assetRoutes.get('/getAll', ensureAuthenticated, assetController.getAll.bind(assetController));

assetRoutes.delete('/delete/:id', ensureAuthenticated, assetController.delete.bind(assetController));

export { assetRoutes };