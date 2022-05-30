import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imei: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  online: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//sobre escribe un method
UsuarioSchema.method("toJson", function () {
  const { __v, _id, password, ...object } = this.object();
  object.uid = _id;
  return object;
});

export default model("Usuario", UsuarioSchema);
