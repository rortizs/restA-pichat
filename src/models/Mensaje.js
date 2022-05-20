import { Schema, model } from "mongoose";

const MensajeSchema = new Schema(
  {
    de: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    para: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//sobre escribe un method
MensajeSchema.method("toJson", function () {
  const { _v, _id, ...object } = this.toObject();
  return object;
});

export default model("Mensaje", MensajeSchema);
