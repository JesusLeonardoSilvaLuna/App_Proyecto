const router = require ("express").Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const verify = require('../verifyToken');

// Actualizar

router.put("/:id", verify, async (req, res) => {
if(req.user.id === req.params.id || req.user.isAdmin) {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.SECRET_KEY
          ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        { new: true}
    );
        res.status(200).json(updatedUser);
    }   catch (err) {
        res.status(500).json(err);
    }
  } else {
    res.status(403).json("Solo puedes actualizar tu cuenta!");
}
});


// Eliminar

router.delete("/:id", verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
       
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("El usuario ha sido eliminado...");
        }   catch (err) {
            res.status(500).json(err);
        }
      } else {
        res.status(403).json("Solo puedes eliminar tu cuenta!");
    }
    });
    

// Consultar

router.get("/find/:id", async (req, res) => {
        try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
            res.status(200).json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    });

// Consultar todo
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if(req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort({_id:-1}).limit(2) : await User.find();
            res.status(200).json(users);
        }   catch (err) {
            res.status(500).json(err);
        }
      } else {
        res.status(403).json("No tienes permisos para ver todos los usuarios");
    }
    });

// consultar usuarios stats

router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    try{
        const data = await User.aggregate([
            {
                $project: {
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err){
        res.status(500).json(err);
    }
});


module.exports = router