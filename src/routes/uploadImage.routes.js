/**
 * path api/addimage
 */

import { Router, response } from "express";
import * as UploadCtrl from "../controllers/upload.controller";

const router = new Router();

/**
 * Ruta: /user GET
 */
router.post(`/`, UploadCtrl.upload, UploadCtrl.uploadFile);

module.exports = router;
