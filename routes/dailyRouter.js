
import {Report} from '../controller/dailyReport-controller.js';
import {Router} from 'express';

const router = new Router();


router.get("/",Report.daily);
router.post("/extraction",Report.extraction);
router.post("/unloading",Report.unloading);
router.post("/transport",Report.transport);
router.post("/weighbridge",Report.weighbridge);
router.post("/depo",Report.depo);
router.post("/stop",Report.stop);
router.post("/speed",Report.speed);
router.post("/lab",Report.lab);
router.post("/mis",Report.mis);
router.post("/crusher",Report.crusher_feed);
router.post("/loader_tonnage",Report.loader_tonnage);
router.post("/abroft",Report.abroft);
router.post("/pile",Report.pile);
router.post("/samples",Report.semple);
router.post("/trips",Report.trips);
router.post("/fuel",Report.fuel);
router.post("/all-fuel",Report.allFuel);


export default router;