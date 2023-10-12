import express from "express";
import dotenv from 'dotenv';
import fs from 'fs';
import expressLayouts from 'express-ejs-layouts';

import {port} from './config.js';
import homeRouter from "./routes/homePageRouter.js";
import serviseRouter from "./routes/serviseRouter.js";
import mapRouter from './routes/mapRouter.js';
import loginRouter from './routes/loginRouter.js';
import fuelRouter from './routes/fuel-router.js';
import dailyRouter from './routes/dailyRouter.js';
import weeklyRoutes from './routes/weeklyRoutes.js';

dotenv.config();
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout","./layout/mainLayout.ejs");

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

app.get("/test",(req,res)=>{
  res.render("index")
})
app.use("/", loginRouter);
app.use("/fuel", fuelRouter);
app.use("/home", homeRouter);
app.use("/service", serviseRouter);
app.use("/map", mapRouter);
app.use("/report", dailyRouter);
app.use("/weekly-report", weeklyRoutes);
app.get("/get-map", (req, res) => {
  return res.render("map",{layout:"./layout/reportLayout.ejs"});
});
app.use((req,res)=>{
  res.render("login",{can_access:"",error:""})
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
