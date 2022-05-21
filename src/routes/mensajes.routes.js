/**
 * path: /api/mensajes
 */

import { Router, response } from "express";
import { validarJWT } from "../middlewares/validar-jwt";
import * as chatsCtrl from "../controllers/mensaje.controller";

const router = new Router();

//validate token
router.get("/:de", validarJWT, chatsCtrl.obtenerchat);

export default router;
