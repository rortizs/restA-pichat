/**
 * path : /api/ruta
 */
import { Router, response } from "express";
import { check } from "express-validator";

import * as authsCtrl from "../controllers/auth.controller";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

//exec router
const router = new Router();

//exceute one rute
//method post from save new auth user
router.post("/new",
  [
    check("nombre", "Name is required").not().isEmpty(),
    check("user", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("imei", "Imei is required").not().isEmpty(),
    validarCampos,
  ],
  authsCtrl.CreateUser
);

//method post from login auth user
router.post("/",
  [
    check("user", "user is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  authsCtrl.login
);

//validate token
router.get("/renew", validarJWT, authsCtrl.renewToken);

//export router
export default router;
