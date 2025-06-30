// routes/base.routes.js
import express from "express";
import {
  getAllBases,
  createBase,
  updateBase,
  deleteBase
} from "../controller/base.controller.js";

import { userAuth, isAdmin } from "../middleware/userAuth.js";

const baseRouter = express.Router();

// All routes are protected and admin-only
baseRouter.use(userAuth);

baseRouter.get("/", getAllBases);
baseRouter.post("/", createBase);
baseRouter.put("/:id", updateBase);
baseRouter.delete("/:id", deleteBase);

export default baseRouter;
