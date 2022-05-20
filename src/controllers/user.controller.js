import { response } from "express";
import Usuario from "../models/User";

export const getUsers = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;
  try {
    const usuarios = await Usuario.find({ _id: { $ne: req.uid }, active: true })
      .sort("-online")
      .skip(desde)
      .limit(20);

    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error on get users",
    });
  }
};

export const getUsersAll = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;

  try {
    const usuarios = await Usuario.find({ _id: { $ne: req.uid } })
      .sort("-online")
      .skip(desde)
      .limit(20);

    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error on get users",
    });
  }
};

export const updateUser = async (req, res = response) => {
  try {
    const updateUser = await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "User is activated successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error on update users",
    });
  }
};
