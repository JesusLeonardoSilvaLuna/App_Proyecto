const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const passport = require('passport');

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = new User({
      username,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
      role,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password or username!");
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GOOGLE AUTH
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

// Ruta de retorno de inicio de sesión con Google
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirigir al usuario después del inicio de sesión
    res.redirect("/");
  }
);

// Ruta para registrar un usuario con Google
router.get("/google/register", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

// Ruta de retorno de registro con Google
router.get("/google/register/callback",
  passport.authenticate("google", { failureRedirect: "/register" }),
  async (req, res) => {
    try {
      // Si el usuario no existe, crear uno nuevo
      if (!req.user) {
        return res.status(401).json({ message: "Usuario no autenticado con Google" });
      }
      
      // Redirigir al usuario después del registro
      res.redirect("/dashboard"); // Cambia esto por la ruta a la que deseas redirigir al usuario después del registro
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el registro con Google" });
    }
  }
);

module.exports = router;
