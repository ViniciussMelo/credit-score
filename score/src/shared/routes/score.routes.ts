import { Router } from 'express';

import { ScoreController } from '../../modules/score/controllers/score.controller';
import { ensureAuthenticated } from '../../shared/middleware/auth.middleware';
import { ensureAdmin } from '../../shared/middleware/ensure-admin.middleware';

const scoreController = new ScoreController();

const scoreRoutes = Router();

scoreRoutes.post('/updateAssets', ensureAuthenticated, scoreController.updateUserAsset.bind(scoreController));
scoreRoutes.post('/updateDebts', ensureAuthenticated, ensureAdmin, scoreController.updateUserDebt.bind(scoreController));

scoreRoutes.delete('/delete/:id', ensureAuthenticated, scoreController.deleteUserItem.bind(scoreController));

scoreRoutes.get('/getScore/:id', ensureAuthenticated, ensureAdmin, scoreController.getUserScore.bind(scoreController));


export { scoreRoutes };