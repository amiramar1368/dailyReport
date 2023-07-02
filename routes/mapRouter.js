
import {Map} from '../controller/mapController.js';
import {Router} from 'express';

const router = new Router();


router.get("/",Map.map)
router.post("/route-report",Map.report);
router.get("/get-token",Map.get_token);

export default router;