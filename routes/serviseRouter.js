import { Router } from "express";

import { Service } from "../controller/servicelController.js";
import {logger} from '../model/db.js';

const router = new Router();

router.post("/fetch-services",logger.isDBExist,logger.saveToDB,Service.fetchServices );


router.get("/done-report",logger.isDBExist,Service.doneReport);
router.get("/delete-report/:id",Service.deleteReport);

router.post("/detail-report",logger.detailDoneReport);

router.get("/fetch-details",Service.fetchDetail);
router.get("/fetch-user/:id",Service.fetcchUser,Service.fetchDetail);


export default router;

