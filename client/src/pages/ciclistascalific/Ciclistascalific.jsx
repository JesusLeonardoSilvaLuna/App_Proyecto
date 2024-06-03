import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ciclistasCalific.scss';

const CiclistasCalificados = () => {
  const [calificados, setCalificados] = useState([]);

  useEffect(() => {
    fetchCalificados();
  }, []);

  const fetchCalificados = async () => {
    try {
      const response = await axios.get('https://app-proyecto-api.vercel.app/api/juez/calificados');
      setCalificados(response.data);
    } catch (error) {
      console.error('Error fetching calificados:', error);
    }
  };

  return (
    <div className="calificados-page">
      <h1>Ciclistas Calificados</h1>
      <div className="calificados-list">
        {calificados.map(item => (
          <div key={item._id} className="calificado-card">
            <h2>{item.ciclistaId.nombre} {item.ciclistaId.apellidos}</h2>
            <p><strong>Puntaje:</strong> {item.puntaje}</p>
            <p><strong>Comentario:</strong> {item.comentario}</p>
            <p><strong>Juez:</strong> {item.juezId.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CiclistasCalificados;