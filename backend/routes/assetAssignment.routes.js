import express from 'express';
import {getAssetAssignments,createAssignment,deleteAssignment} from '../controller/assetAssignment.controller.js';
import { userAuth } from '../middleware/userAuth.js';

const assetAssignmentRouter = express.Router();

assetAssignmentRouter.get('/', userAuth ,getAssetAssignments);
assetAssignmentRouter.post('/',userAuth , createAssignment);
assetAssignmentRouter.delete('/:id', userAuth , deleteAssignment);

export default assetAssignmentRouter;
