import express from 'express';
import { createPurchase, getPurchases } from '../controller/purchase.controller.js';
import { userAuth } from '../middleware/userAuth.js';

const purchaseRouter = express.Router();

purchaseRouter.get('/', userAuth, getPurchases);
purchaseRouter.post('/', userAuth, createPurchase);

export default purchaseRouter;
