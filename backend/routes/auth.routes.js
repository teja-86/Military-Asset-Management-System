import express from 'express';
import { login, register, logout ,forgotPassword} from '../controller/auth.controller.js';
import { userAuth, isAdmin } from '../middleware/userAuth.js';
import { deleteUser, getAllUsers, getUserData, updateUser } from '../controller/user.controller.js';
const authRouter = express.Router();

authRouter.get('/user' , userAuth ,getUserData);
authRouter.get('/',userAuth,isAdmin,getAllUsers)
authRouter.post('/login', login);
authRouter.delete('/:userId',userAuth,isAdmin,deleteUser);
authRouter.post('/logout', userAuth, logout);
authRouter.put('/:id',userAuth,isAdmin,updateUser);
authRouter.post('/register', userAuth, isAdmin, register);
authRouter.post("/forgot-password", forgotPassword);

export default authRouter;
