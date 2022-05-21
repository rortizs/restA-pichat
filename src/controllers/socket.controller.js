import Usuario from "../models/User";
import Mensaje from "../models/Mensaje";
import bcrypt from "bcryptjs/dist/bcrypt";

export const usuarioConectado = async (_id = "") => {
  const usuario = Usuario.findById(_id);
  const update = { online: true };

  await Usuario.findByIdAndUpdate(_id, update);
  console.log("Authenticated ", usuario.user);
  return usuario;
};

export const UsuarioDesconectado = async (_id = "") => {
  const usuario = Usuario.findById(_id);
  const update = { online: false };

  await Usuario.findByIdAndUpdate(_id, update);
  console.log("Bye User  ", usuario.user);

  return usuario;
};

//save messages on database
export const grabarMensaje = async (payload) => {
  /**
        payload:{
            de: 'usuario.uid',
            para: 'usuario.uid',
            texto: 'mensaje.mensaje',
            iamgen: 'imagen',

        }
     */

  try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();

    return true;
  } catch (error) {
    return false;
  }
};
