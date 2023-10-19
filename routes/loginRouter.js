import {Router} from 'express';

import {Login} from '../controller/loginController.js';

const router = new Router();

router.get("/",Login.loginPage);
router.post("/",Login.getUser);
router.get("/logout",Login.logout);

export default router;