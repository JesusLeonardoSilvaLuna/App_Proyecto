const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profilePic: { type: String, default: "" },
    coverPic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ["Ciclista", "Aficionado", "Organizador", "Juez", "Administrador"], required: true},
    ciclistaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciclista' }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
