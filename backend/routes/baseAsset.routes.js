// routes/baseAsset.routes.js

import express from "express";
import { getBaseAssetsForBase } from "../controller/baseAsset.controller.js";
import { userAuth } from "../middleware/userAuth.js";

const baseAssetRouter = express.Router();

baseAssetRouter.get("/:base_id", userAuth, getBaseAssetsForBase);

export default baseAssetRouter;
