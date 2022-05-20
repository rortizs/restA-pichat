import { response } from "express";
import bcrypt from "bcryptjs";

import Usuario from "../models/User";
import { generarJWT } from "../libs/jwt";

export const CreateUser = async (req, res = response) => {
  const { user, password, imei } = req.body;

  try {
    const existeUser = await Usuario.findOne({ user });

    if (existeUser) {
      return res.status(400).json({
        ok: false,
        msg: "Then User is already exist",
      });
    }

    const usuario = new Usuario(req.body);

    //encrypt password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //saved user
    await usuario.save();

    //generated token JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact your administrator",
    });
  }
};

export const login = async (req, res = response) => {
  const { user, password, imei } = req.body;

  try {
      const usuarioDB = await Usuario.findOne({ user, active: true });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "The user is not exited or not is actived",
      });
    }

    //   //validated user active
    //   const IsActive = await Usuario.findOne({ user: usuarioDB, active: true });

    //   if (!IsActive) {
    //     return res.status(400).json({
    //       ok: false,
    //       msg: "The user is not active, contact your administrator",
    //     });
    //   }

    //validated imei
      const validImei = imei == usuarioDB.imei;


    if (!validImei) {
      return res.status(400).json({
        ok: false,
        msg: "The imei is not register",
      });
    }

    //validate password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "The password is not valid",
      });
    }

    //generated JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, contact your Administrator",
    });
  }
};

export const renewToken = async (req, res = response) => {
  //recover the user id
    const uid = req.uid;

  //generation new JWT
  const token = await generarJWT(uid);

  //get user data from uid
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    usuario,
    token,
  });
};
