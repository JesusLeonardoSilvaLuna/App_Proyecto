const router = require ("express").Router();
const Event = require('../models/Event');
const verify = require('../verifyToken');

// Crear evento

router.post("/", verify, async (req, res) => {
  if(req.user.isAdmin) {
    const newEvent = new Event(req.body);
    try{
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (err) {
            res.status(500).json(err);
        }
  } else {
    res.status(403).json("No tienes permiso");
}
});

//Actualizar 

router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      const newEvent = new Event(req.body);
      try{
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body,
            }, 
            { new: true}
          );
          res.status(200).json(updatedEvent);
        } catch (err) {
          res.status(500).json(err);
        }
    } else {
      res.status(403).json("No tienes permiso");
  }
  });

//Eliminar

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try{
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json("El usuario ha sido eliminado...");
      } catch (err) {
          res.status(500).json(err);
      }
    } else {
      res.status(403).json("No tienes permiso");
    }
  });
//Consultar

router.get("/find/:id", verify, async (req, res) => {
  try{
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
    }
  });

//Consulta aletoria 

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let event;
  try{
  if (type === "races") {
    event = await Event.aggregate([
      { $match: {isRaces: true} },
      { $sample: {size: 1} },
    ]);
  } else {
    event = await Event.aggregate([
      { $match: {isRaces: true} },
      { $sample: {size: 1} },
    ]);
  }
  res.status(200).json(event);
} catch (err) {
  res.status(500).json(err);
  }
});

//Consultar todo 

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try{
      const events = await Event.find();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No tienes permiso");
  }
});
module.exports = router