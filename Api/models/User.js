const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    coverPic: { type: String, default: "" }, // Imagen de portada
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ["Ciclista", "Aficionado", "Organizador", "Juez", "Administrador"], required: true },
    ciclistaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciclista' } // Referencia al ciclista
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);