import React, { useState, useEffect, useRef } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/evento/obtener');
        setEventos(response.data);
      } catch (error) {
        console.error('Error fetching eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  useEffect(() => {
    if (eventos.length > 0) {
      startAutoSlide();
    }
    return stopAutoSlide;
  }, [eventos]);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  const handleCardClick = async (id) => {
    try {
      const response = await axios.get(`https://app-proyecto-api.vercel.app/evento/obtener/${id}`);
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

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? eventos.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % eventos.length);
  };

  // Estilo para el área destacada
  const featuredStyle = {
    backgroundImage: 'url("https://markrossstudio.com/wp/wp-content/uploads/2014/09/MRoss_CPowersRacingB-e1410990826225.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
    height: '420px', // Ajusta la altura según sea necesario
    marginBottom: '10px', // Espacio entre el área destacada y las tarjetas
  };
return (
    <div>
      <div className="organizador">
        <Navbar />
      </div>
      <div className="featured" style={featuredStyle}></div>
      <div className="cards-container">
        <button className="arrow arrow-left" onClick={goToPrevious}>&#8249;</button>
        <div className="slider">
          <div className="cards" style={{ transform: `translateX(-${currentIndex * (100 / eventos.length)}%), width: ${100 * eventos.length}%`}}>
            {eventos.map((evento, index) => (
              <Card
                key={evento._id}
                image={evento.imagen || 'https://via.placeholder.com/150'}
                title={evento.nombre}
                description={evento.descripcion}
                onClick={() => handleCardClick(evento._id)}
              />
            ))}
          </div>
        </div>
        <button className="arrow arrow-right" onClick={goToNext}>&#8250;</button>
      </div>
      {showModal && selectedEvento && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div>
              <h2>{selectedEvento.nombre}</h2>
            </div>
            <div className="imagen">
              <img src={selectedEvento.imagen || 'https://via.placeholder.com/150'} alt={selectedEvento.nombre} />
            </div>
            <div className="evento-detalle">
              <div className="detalles">
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