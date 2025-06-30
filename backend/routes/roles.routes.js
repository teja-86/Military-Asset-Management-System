import express from "express";
import { getAllRoles } from "../controller/role.controller.js";
import { isAdmin, userAuth } from "../middleware/userAuth.js";

const roleRouter = express.Router();

roleRouter.get('/',userAuth,isAdmin, getAllRoles); 

export default roleRouter;
