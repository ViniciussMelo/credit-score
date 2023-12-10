import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/register')
userRoutes.delete('/delete');
userRoutes.post('/login')

export { userRoutes }