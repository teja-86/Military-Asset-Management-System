import express from "express";
import { userAuth } from '../middleware/userAuth.js';
import {getTransfers , createTransfer} from "../controller/transfer.controller.js"
const transferRouter = express.Router();

transferRouter.get('/' , userAuth ,getTransfers);

transferRouter.post('/',userAuth , createTransfer);

export default transferRouter;