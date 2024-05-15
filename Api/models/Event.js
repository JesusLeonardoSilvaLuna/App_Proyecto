const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    nombreEvento: { type: String, required: true, unique: true },
    lugarCarrera: { type: String, required: true },
    descripcionCarrera: { type: String, required: true },
    fechaInicioCarrera: { type: Date, required: true },
    categoriaCarrera: { type: String, required: true },
    modalidadCarrera: { type: Boolean, default: false },
    nombreRuta: { type: String, required: true },
    ruta: { type: String, required: true },
    descripcionRuta: { type: String, required: true },
    puntosReferencia: { type: Int32, required: true }
    },
);
        
// Creación del modelo Evento utilizando el esquema definido
         

module.exports = mongoose.model('Event', EventSchema);
        
        
