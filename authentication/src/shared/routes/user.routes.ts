import { Router } from 'express';
import { UserController } from '../../modules/users/controllers/user.controller';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/register', userController.register);
userRoutes.delete('/delete', userController.delete);
userRoutes.post('/login', userController.login);

export { userRoutes }