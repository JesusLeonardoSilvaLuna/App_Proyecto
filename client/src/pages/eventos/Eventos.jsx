import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import './eventos.scss';

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

// Componente principal Eventos
const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('https://app-proyecto-api.vercel.app/api/eventos/obtener');
        setEventos(response.data);
        console.log(response.data); // Verificar que la URL de la imagen se recibe correctamente
      } catch (error) {
        console.error('Error fetching eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  const handleCardClick = async (id) => {
    try {
      const response = await axios.get(`https://app-proyecto-api.vercel.app/eventos/obtener/${id}`);
      setSelectedEvento(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching evento:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvento(null);
  };


   // Estilo para el área destacada 
  const featuredStyle = { 
    backgroundImage: 'url("https://markrossstudio.com/wp/wp-content/uploads/2014/09/MRoss_CPowersRacingB-e1410990826225.jpg")', 
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
      <div className="featured" style={featuredStyle}></div>
      <div className="cards-container">
        {eventos.map(evento => (
          <Card 
            key={evento._id}
            image={evento.imagen || 'https://via.placeholder.com/150'}
            title={evento.nombre}
            description={evento.descripcion}
            onClick={() => handleCardClick(evento._id)}
          />
        ))}
      </div>
      {showModal && selectedEvento && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="evento-detalle">
              <div className="imagen">
                <img src={selectedEvento.imagen || 'https://via.placeholder.com/150'} alt={selectedEvento.nombre} />
              </div>
              <div className="detalles">
                <h2>{selectedEvento.nombre}</h2>
                <p>{selectedEvento.descripcion}</p>
                <p><strong>Fecha:</strong> {new Date(selectedEvento.fecha).toLocaleDateString()}</p>
                <p><strong>Lugar:</strong> {selectedEvento.lugar}</p>
                <p><strong>Categorías:</strong> {selectedEvento.categorias.map(cat => cat.nombre).join(', ')}</p>
                <p><strong>Rutas:</strong> {selectedEvento.rutas.map(ruta => ruta.nombre).join(', ')}</p>
                <a href="/inscripciones" className="button">Inscribirse</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos;