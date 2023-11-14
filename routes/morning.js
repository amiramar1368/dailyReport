import {Router} from 'express';

import {Morning} from '../controller/morningController.js';

const router = new Router();

router.get("/",Morning.mainPage)
router.post("/truck-shovel",Morning.shovel)
router.post("/truck-unloading",Morning.truckUnloading)

export default router;