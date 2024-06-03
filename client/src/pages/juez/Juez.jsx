import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './juez.scss';

const Juez = () => {
  const [ciclistas, setCiclistas] = useState([]);
  const [selectedCiclista, setSelectedCiclista] = useState(null);
  const [puntaje, setPuntaje] = useState('');
  const [comentario, setComentario] = useState('');
  const juezId = 'ID_DEL_JUEZ'; // Reemplaza esto con el ID del juez actual

  useEffect(() => {
    fetchCiclistas();
  }, []);

  const fetchCiclistas = async () => {
    try {
      const response = await axios.get('https://app-proyecto-api.vercel.app/api/ciclista/obtener');
      setCiclistas(response.data);
    } catch (error) {
      console.error('Error fetching ciclistas:', error);
    }
  };

  const handleSelectCiclista = (ciclista) => {
    setSelectedCiclista(ciclista);
  };

  const handlePuntuar = async () => {
    try {
      const response = await axios.post(`https://app-proyecto-api.vercel.app/api/juez/${juezId}/puntuar`, {
        ciclistaId: selectedCiclista._id,
        puntaje,
        comentario
      });
      alert('Puntaje otorgado correctamente');
      setSelectedCiclista(null);
      setPuntaje('');
      setComentario('');
    } catch (error) {
      console.error('Error al otorgar puntaje:', error);
      alert('Hubo un error al otorgar el puntaje. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="juez">
      <h1>Pagina del Juez</h1>
      <div className="ciclistas-list">
        <h2>Lista de Ciclistas</h2>
        <ul>
          {ciclistas.map(ciclista => (
            <li key={ciclista._id} onClick={() => handleSelectCiclista(ciclista)}>
              {ciclista.nombre} {ciclista.apellidos}
            </li>
          ))}
        </ul>
      </div>
      {selectedCiclista && (
        <div className="puntuar-section">
          <h2>Otorgar Puntaje a {selectedCiclista.nombre} {selectedCiclista.apellidos}</h2>
          <input
            type="number"
            value={puntaje}
            onChange={(e) => setPuntaje(e.target.value)}
            placeholder="Puntaje (0-100)"
          />
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Comentario"
          />
          <button onClick={handlePuntuar}>Otorgar Puntaje</button>
        </div>
      )}
    </div>
  );
};

export default Juez;