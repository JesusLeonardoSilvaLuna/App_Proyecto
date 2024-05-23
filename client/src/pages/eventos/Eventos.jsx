import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar'; 
import Card from '../../components/card/Card';
import axios from 'axios';
import './eventos.scss';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('https://app-proyecto-api.vercel.app/api/evento/obtener');
        setEventos(response.data);
      } catch (error) {
        console.error('Error fetching eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  // Estilo para el área destacada
  const featuredStyle = {
    backgroundImage: url('https://markrossstudio.com/wp/wp-content/uploads/2014/09/MRoss_CPowersRacingB-e1410990826225.jpg'),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
    height: '300px', // Ajusta la altura según sea necesario
    marginBottom: '20px', // Espacio entre el área destacada y las tarjetas
  };

  return (
    <div>
      <div className="organizador">
        <Navbar />
      </div>
      {/* Área destacada */}
      <div className="featured" style={featuredStyle}></div>
      {/* Tarjetas de eventos */}
      <div className="cards-container">
        {eventos.map(evento => (
          <Card 
            key={evento._id}
            image={evento.imagen}
            title={evento.nombre}
            description={evento.descripcion}
          />
        ))}
      </div>
    </div>
  );
};

export default Eventos;