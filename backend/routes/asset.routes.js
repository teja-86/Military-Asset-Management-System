import express from 'express';
import {
  createAsset,
  getAllAssets,
  getAssetsByCategory,
  updateAsset,
  deleteAsset
} from '../controller/asset.controller.js';

import {userAuth, isAdmin } from '../middleware/userAuth.js';

const assetRouter = express.Router();

assetRouter.get('/', userAuth, getAllAssets);

assetRouter.get('/category/:category', userAuth, getAssetsByCategory);

assetRouter.post('/', userAuth, isAdmin, createAsset);

assetRouter.put('/:name', userAuth, isAdmin, updateAsset);

assetRouter.delete('/:name', userAuth, isAdmin, deleteAsset);

export default assetRouter;
