/**
 *  path: /api/usuarios
 */

import { Router, response } from "express";
import { validarJWT } from "../middlewares/validar-jwt";
import * as UsersCtrl from "../controllers/user.controller";

const router = new Router();

//validate token

router.get("/", validarJWT, UsersCtrl.getUsers);
router.put("/:id", UsersCtrl.updateUser);

export default router;
