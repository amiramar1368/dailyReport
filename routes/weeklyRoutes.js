import {Report} from '../controller/weeklyReport-controller.js';
import {Router} from 'express';

const router = new Router();
router.get("/",Report.mainPage);
router.post("/depo-to-crusher",Report.depoToCrusher);
router.post("/saha-to-crusher",Report.sahaToCrusher);
router.post("/truck-unloading",Report.truckUnloading);
router.post("/fuel",Report.fuel);
router.post("/shovel",Report.shovelPerformance);
router.post("/weighbridge",Report.weighbridge);
router.post("/depo",Report.depo);
router.post("/lab",Report.lab);
router.post("/stop",Report.stop);
router.post("/crusher-feed",Report.crusherFeed);
export default router;