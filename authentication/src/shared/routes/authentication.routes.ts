import { Router } from 'express';

const authenticationRoutes = Router();

authenticationRoutes.get('/refresh-token')

export { authenticationRoutes };