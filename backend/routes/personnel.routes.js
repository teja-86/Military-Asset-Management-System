import express from "express";
import db from "../config/database.js";

import {userAuth , isAdmin} from '../middleware/userAuth.js';
import { createPersonnel, deletePersonnel, getAllPersonnel, updatePersonnel } from "../controller/personnel.controller.js";
const personnelRouter = express.Router();
personnelRouter.get('/',userAuth,getAllPersonnel);
personnelRouter.post('/',userAuth,createPersonnel);
personnelRouter.put('/:id',userAuth,updatePersonnel);
personnelRouter.delete('/:id',userAuth,deletePersonnel);
export default personnelRouter;