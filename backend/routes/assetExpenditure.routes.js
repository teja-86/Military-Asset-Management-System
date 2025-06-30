import express from "express";
import {
  createAssetExpenditure,
  getAssetExpenditures
} from "../controller/assetExpenditure.controller.js";
import {userAuth } from "../middleware/userAuth.js";

const assetExpenditureRouter = express.Router();
assetExpenditureRouter.get('/', userAuth, getAssetExpenditures);
assetExpenditureRouter.post('/', userAuth ,createAssetExpenditure);

export default assetExpenditureRouter;
