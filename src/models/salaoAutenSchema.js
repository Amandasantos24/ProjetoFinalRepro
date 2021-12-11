const mongoose = require("mongoose");

const salaoAutenSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,

    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    termos_de_uso: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("autent", salaoAutenSchema);
