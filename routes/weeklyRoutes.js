import {Report} from '../controller/weeklyReport-controller.js';
import {Router} from 'express';

const router = new Router();
router.get("/",Report.mainPage);
router.post("/depo-to-crusher",Report.depoToCrusher);
router.post("/saha-to-crusher",Report.sahaToCrusher);
router.post("/truck-unloading",Report.truckUnloading);
export default router;