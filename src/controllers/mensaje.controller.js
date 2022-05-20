import Mensaje from "../models/Mensaje";
import mongoose from "mongoose";

export const obtenerchat = async (req, res) => {
  const miId = mongoose.Types.ObjectId(req.uid);
  const mensajesDe = mongoose.Types.ObjectId(req.params.de);

  //recopilar los ultimos 10 mensajes
  const last10 = await Mensaje.find({
    $or: [
      { de: miId, para: mensajesDe },
      { de: mensajesDe, para: miId },
    ],
  })

    .sort({ createdAt: "desc" })
    .limit(10);

  res.json({
    ok: true,
    mensaje: last10,
  });
};
