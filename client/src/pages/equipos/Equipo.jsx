import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

// Componente Card
const Card = ({ image, title, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

// Componente principal Equipos
const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipo, setSelectedEquipo] = useState(null);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get('https://app-proyecto-api.vercel.app/api/equipo/obtener');
        setEquipos(response.data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      }
    };

    fetchEquipos();
  }, []);

  const fetchCiclistaDetails = async (id) => {
    try {
      const response = await axios.get(`https://app-proyecto-api.vercel.app/api/ciclista/obtener/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ciclista:', error);
    }
  };

  const handleCardClick = async (id) => {
    try {
      const response = await axios.get(`https://app-proyecto-api.vercel.app/api/equipo/obtener/${id}`);
      const equipo = response.data;

      // Obtener detalles del líder si es solo un ID
      if (typeof equipo.lider === 'string') {
        equipo.lider = await fetchCiclistaDetails(equipo.lider);
      }

      // Obtener detalles de los integrantes
      const integrantesDetalles = await Promise.all(
        equipo.integrantes.map(async (integranteId) => await fetchCiclistaDetails(integranteId))
      );
      equipo.integrantes = integrantesDetalles;

      setSelectedEquipo(equipo);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching equipo:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEquipo(null);
  };

  // Estilo para el área destacada 
  const featuredStyle = { 
    backgroundImage: 'url("https://markrossstudio.com/wp/wp-content/uploads/2014/09/MRoss_CPowersRacingB-e1410990826225.jpg")', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    borderRadius: '10px', 
    height: '400px', // Ajusta la altura según sea necesario 
    marginBottom: '20px', // Espacio entre el área destacada y las tarjetas 
  };


  return (
    <div>
      <div className="organizador">
        <Navbar />
      </div>
      <div className="featured" style={featuredStyle}></div>
      <div className="cards-container">
        {equipos.map(equipo => (
          <Card 
            key={equipo._id}
            image={equipo.imagen || 'https://via.placeholder.com/150'}
            title={equipo.nombre}
            description={`Líder: ${equipo.lider.nombre || 'N/A'} ${equipo.lider.apellidos || ''}`}
            onClick={() => handleCardClick(equipo._id)}
          />
        ))}
      </div>
      {showModal && selectedEquipo && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div>
              <h2>{selectedEquipo.nombre}</h2>
            </div>
            <div className="imagen">
              <img src={selectedEquipo.imagen || 'https://via.placeholder.com/150'} alt={selectedEquipo.nombre} />
            </div>
            <div className="equipo-detalle">
              <div className="detalles">
                {selectedEquipo.lider && (
                  <p><strong>Líder:</strong> {selectedEquipo.lider.nombre} {selectedEquipo.lider.apellidos}</p>
                )}
                {selectedEquipo.integrantes && selectedEquipo.integrantes.length > 0 && (
                  <>
                    <p><strong>Integrantes:</strong></p>
                    <ul>
                      {selectedEquipo.integrantes.map((ciclista) => (
                        <li key={ciclista._id}>{ciclista.nombre} {ciclista.apellidos}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipos;