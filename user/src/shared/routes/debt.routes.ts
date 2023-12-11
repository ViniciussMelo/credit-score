import { Router } from 'express';

import { DebtController } from '../../modules/debts/controllers/debt.controller';
import { ensureAuthenticated } from '../middleware/auth.middleware';
import { ensureAdmin } from '../middleware/ensure-admin.middleware';

const debtController = new DebtController();

const debtRoutes = Router();

debtRoutes.post('/create', ensureAuthenticated, ensureAdmin, debtController.create.bind(debtController));

debtRoutes.patch('/update/:id', ensureAuthenticated, ensureAdmin, debtController.update.bind(debtController));

debtRoutes.get('/getByUserId/:id', ensureAuthenticated, ensureAdmin, debtController.getByUserId.bind(debtController));

debtRoutes.delete('/delete/:id', ensureAuthenticated, ensureAdmin, debtController.deleteById.bind(debtController));

export { debtRoutes };