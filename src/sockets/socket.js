import { io } from "../index";
import { verificarJWT } from "../libs/jwt";
import {
  usuarioConectado,
  UsuarioDesconectado,
  grabarMensaje,
} from "../controllers/socket.controller";

//mensaje de socket

io.on("connection", (client) => {
  console.log("Client conected");

  //verificarJWT(client.handshake.query.token);
  const [valido, uid] = verificarJWT(client.handshake.headers["x-token"]);

  //verifico authenticated
  if (!valido) {
    return client.desconnect();
  }

  //cliente contected
  usuarioConectado(uid);

  console.log(uid);

  /**
    Para ingresar al usuario a una sala en particular
    sala global, client.id, uid
     */

  //para unir a una sala especificamente por uid
  client.join(uid);

  //escuchar del cliente el mensaje personal
  client.on("mensaje-personal", async (payload) => {
    console.log(payload);
    //grabar mensaje
    await grabarMensaje(payload);

    io.to(payload.para).emit("mensaje-personal", payload);
  });

  /**
    Para mandar un mensaje a una persona particular
    client.to(uid).emit('Nombre_del_evento');
     */

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    UsuarioDesconectado(uid);
    console.log(uid);
  });

  /**
    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', {admin: 'Nuevo Mensaje' });

    });
     */
});
