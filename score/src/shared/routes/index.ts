import { Router } from 'express';

import { scoreRoutes } from './score.routes';

const router = Router();

router.use('/score', scoreRoutes);

export { router };