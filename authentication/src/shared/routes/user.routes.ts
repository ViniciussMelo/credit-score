import { Router } from 'express';

import { UserController } from '../../modules/users/controllers/user.controller';
import { ensureAuthenticated } from '../middleware/auth.middleware';

const userController = new UserController();

const userRoutes = Router();

userRoutes.delete('/delete', ensureAuthenticated, userController.delete.bind(userController));
userRoutes.post('/register', userController.register.bind(userController));
userRoutes.post('/login', userController.login.bind(userController));

export { userRoutes }