
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import './inscripciones.scss';

const InscripcionForm = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [numero, setNumero] = useState('');
  const [seguroSocial, setSeguroSocial] = useState('');
  const [contactoEmergenciaNombre, setContactoEmergenciaNombre] = useState('');
  const [contactoEmergenciaNumero, setContactoEmergenciaNumero] = useState('');

  const handleInscripcion = async (e) => {
    e.preventDefault();
    try {
      const nuevoCiclista = {
        nombre,
        apellidos,
        edad,
        genero,
        direccion,
        correo,
        numero,
        seguroSocial,
        contactoEmergencia: {
          nombre: contactoEmergenciaNombre,
          numero: contactoEmergenciaNumero
        }
      };
      const response = await axios.post('https://app-proyecto-api.vercel.app/api/inscripciones/crear', nuevoCiclista);
      console.log('Ciclista creado:', response.data);
      // Reiniciar el formulario o mostrar un mensaje de éxito según sea necesario
    } catch (error) {
      console.error('Error al crear el ciclista:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="img-container">
        <div className="form-container">
          <div className="form-content">
            <h2>Formulario de Inscripción</h2>
            <form onSubmit={handleInscripcion}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="apellidos">Apellidos:</label>
                  <input type="text" id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edad">Edad:</label>
                  <input type="number" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="genero">Género:</label>
                  <select id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required>
                    <option value="">Selecciona</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="direccion">Dirección:</label>
                  <textarea id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="correo">Correo Electrónico:</label>
                  <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="numero">Número de Teléfono:</label>
                  <input type="tel" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="seguroSocial">Número de Seguro Social:</label>
<input type="text" id="seguroSocial" value={seguroSocial} onChange={(e) => setSeguroSocial(e.target.value)} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactoEmergenciaNombre">Nombre del Contacto de Emergencia:</label>
                  <input type="text" id="contactoEmergenciaNombre" value={contactoEmergenciaNombre} onChange={(e) => setContactoEmergenciaNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="contactoEmergenciaNumero">Número del Contacto de Emergencia:</label>
                  <input type="tel" id="contactoEmergenciaNumero" value={contactoEmergenciaNumero} onChange={(e) => setContactoEmergenciaNumero(e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <button type="submit">Inscribirse</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InscripcionForm;