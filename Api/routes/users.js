const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const upload = require('../multer-config'); // Usando multer-config.js

// Obtener usuario por ID
router.get("/find/:id", verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Actualizar imágenes de perfil y portada
router.put("/update-images/:id", upload.fields([{ name: 'profilePic' }, { name: 'coverPic' }]), async (req, res) => {
  try {
    const updatedData = {};
    if (req.files['profilePic']) {
      updatedData.profilePic = req.files['profilePic'][0].path;
    }
    if (req.files['coverPic']) {
      updatedData.coverPic = req.files['coverPic'][0].path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Actualizar usuario
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Puedes actualizar solo tu cuenta");
  }
});

// Eliminar usuario
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Usuario eliminado");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Puedes eliminar solo tu cuenta");
  }
});

// Consultar todos los usuarios
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(2)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No puedes ver todos los usuarios");
  }
});

module.exports = router;