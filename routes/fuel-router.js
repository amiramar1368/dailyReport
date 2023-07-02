import {Router} from 'express';

import {Fuel} from '../controller/fuel-controller.js';

const router = new Router();

router.get("/",Fuel.get_data);
router.post("/get-data",Fuel.get_data);

export default router;