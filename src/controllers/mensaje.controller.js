import Mensaje from "../models/Mensaje";
import mongoose from "mongoose";

export const obtenerchat = async (req, res) => {
  //const miId = mongoose.Types.ObjectId(req._id);
  const miId = { _id: req.uid };
  //const mensajesDe = mongoose.Types.ObjectId(req.params.de);
  const mensajesDe = req.params.de;

  //recopilar los ultimos 10 mensajes
  const last20 = await Mensaje.find({
    $or: [
      { de: miId, para: mensajesDe },
      { de: mensajesDe, para: miId },
    ],
  })

    .sort({ createdAt: "desc" })
    .limit(20);

  res.json({
      ok: true,
    mensajes: last20,
  });
};
