/**
 * path /api/addimage
 */

import { Router, response } from "express";
//import { validarJWT } from "../middlewares/validar-jwt";
import * as UploadCtrl from "../controllers/upload.controller";

const router = new Router();

/**
 * validar token
 */
router.post("/", UploadCtrl.upload, UploadCtrl.uploadFile);

module.exports = router;
