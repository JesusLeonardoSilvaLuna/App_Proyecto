import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './juez.scss';

const Juez = () => {
  const [eventos, setEventos] = useState([]);
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [selectedCiclista, setSelectedCiclista] = useState(null);
  const [puntaje, setPuntaje] = useState({ tiempo: '', distancia: '', posicion: '', elevationGain: '' });
  const juezId = 'ID_DEL_JUEZ'; // Replace this with the current judge's ID

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await axios.get('https://app-proyecto-api.vercel.app/api/eventos/obtener');
      setEventos(response.data);
    } catch (error) {
      console.error('Error fetching eventos:', error);
    }
  };

  const handleSelectEvento = (evento) => {
    setSelectedEvento(evento);
    setSelectedCiclista(null);
  };

  const handleSelectCiclista = (ciclista) => {
    setSelectedCiclista(ciclista);
  };

  const handlePuntuar = async () => {
    try {
      await axios.post(`https://app-proyecto-api.vercel.app/api/puntaje/crear`, {
        ciclistaId: selectedCiclista._id,
        eventoId: selectedEvento._id,
        tiempo: puntaje.tiempo,
        distancia: puntaje.distancia,
        posicion: puntaje.posicion,
        elevationGain: puntaje.elevationGain,
      });
      alert('Puntaje otorgado correctamente');
      setSelectedEvento(null);
      setSelectedCiclista(null);
      setPuntaje({ tiempo: '', distancia: '', posicion: '', elevationGain: '' });
    } catch (error) {
      console.error('Error al otorgar puntaje:', error);
      alert('Hubo un error al otorgar el puntaje. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="juez">
      <h1>Pagina del Juez</h1>
      <div className="eventos-list">
        <h2>Lista de Eventos</h2>
        <ul>
          {eventos.map(evento => (
            <li key={evento._id} onClick={() => handleSelectEvento(evento)}>
              {evento.nombre}
            </li>
          ))}
        </ul>
      </div>
      {selectedEvento && (
        <div className="ciclistas-list">
          <h2>Ciclistas en {selectedEvento.nombre}</h2>
          <ul>
            {selectedEvento.ciclistas.map(ciclista => (
              <li key={ciclista._id} onClick={() => handleSelectCiclista(ciclista)}>
                {ciclista.nombre} {ciclista.apellidos}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedCiclista && (
        <div className="puntuar-section">
          <h2>Otorgar Puntaje a {selectedCiclista.nombre} {selectedCiclista.apellidos}</h2>
          <input
            type="number"
            value={puntaje.tiempo}
            onChange={(e) => setPuntaje({ ...puntaje, tiempo: e.target.value })}
            placeholder="Tiempo (segundos)"
          />
          <input
            type="number"
            value={puntaje.distancia}
            onChange={(e) => setPuntaje({ ...puntaje, distancia: e.target.value })}
            placeholder="Distancia (kilómetros)"
          />
          <input
            type="number"
            value={puntaje.posicion}
            onChange={(e) => setPuntaje({ ...puntaje, posicion: e.target.value })}
            placeholder="Posición"
          />
          <input
            type="number"
            value={puntaje.elevationGain}
            onChange={(e) => setPuntaje({ ...puntaje, elevationGain: e.target.value })}
            placeholder="Ganancia de elevación (metros)"
          />
          <button onClick={handlePuntuar}>Otorgar Puntaje</button>
        </div>
      )}
    </div>
  );
};

export default Juez;