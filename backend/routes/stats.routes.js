import express from 'express';
import { getDashboardStats } from '../controller/dashboard.controller.js';
import { userAuth, isAdmin } from '../middleware/userAuth.js';

const statsRouter = express.Router();
statsRouter.get('/stats', userAuth, getDashboardStats);
export default statsRouter;
