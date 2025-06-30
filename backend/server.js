import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from './config/database.js';
import authRouter from "./routes/auth.routes.js";
import assetRouter from './routes/asset.routes.js';
import statsRouter from "./routes/stats.routes.js";
import baseRouter from "./routes/base.routes.js";
import purchaseRouter from "./routes/purchase.routes.js";
import transferRouter from "./routes/transfer.routes.js";
import roleRouter from "./routes/roles.routes.js";
import personnelRouter from "./routes/personnel.routes.js";
import assetAssignmentRouter from './routes/assetAssignment.routes.js';
import baseAssetRouter from "./routes/baseAsset.routes.js";
import assetExpenditureRouter from "./routes/assetExpenditure.routes.js";
dotenv.config();
const allowesOrgin =['http://localhost:5173' ,'http://localhost:4173','https://splendorous-syrniki-e0dc85.netlify.app']
const app=express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowesOrgin,credentials:true}));
app.get('/' , (req , res)=>{
    res.status(200).send('military assest managemetn backend is working');
})
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ All models were synchronized successfully.');
  })
  .catch((err) => {
    console.error('❌ Failed to sync database:', err);
  });
app.use('/api/auth', authRouter);
app.use('/api/assets', assetRouter);
app.use('/api/dashboard' , statsRouter);
app.use('/api/bases' , baseRouter);
app.use('/api/purchases',purchaseRouter);
app.use('/api/transfers',transferRouter);
app.use('/api/roles',roleRouter);
app.use('/api/personnel',personnelRouter);
app.use('/api/asset-assignments', assetAssignmentRouter);
app.use("/api/base-assets", baseAssetRouter);
app.use('/api/asset-expenditures',assetExpenditureRouter);
app.listen(port , ()=>{console.log(`server started on PORT : ${port}`)})
