import { Router } from 'express';

import { AuthenticationController } from './../../modules/authentication/controllers/authentication.controller';

const authenticationController = new AuthenticationController();

const authenticationRoutes = Router();

authenticationRoutes.post('/refresh-token', authenticationController.getRefreshToken.bind(authenticationController));

export { authenticationRoutes };