import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import './eventos.scss';

// Componente Card que representa una tarjeta individual para cada evento
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
  const [eventos, setEventos] = useState([]); // Estado para almacenar la lista de eventos
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedEvento, setSelectedEvento] = useState(null); // Estado para almacenar el evento seleccionado
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para almacenar el índice actual del slider
  const intervalRef = useRef(null); // Referencia para almacenar el intervalo del slider automático

  // useEffect para obtener la lista de eventos al cargar el componente
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('https://app-proyecto-api.vercel.app/api/eventos/obtener');
        setEventos(response.data);
      } catch (error) {
        console.error('Error fetching eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  // useEffect para iniciar el slider automático cuando se cargan los eventos
  useEffect(() => {
    if (eventos.length > 0) {
      startAutoSlide();
    }
    return stopAutoSlide;
  }, [eventos]);

  // Función para iniciar el slider automático
  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // Cambia de evento cada 5 segundos
  };

  // Función para detener el slider automático
  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  // Maneja el clic en una tarjeta de evento
  const handleCardClick = async (id) => {
    try {
      const response = await axios.get(`https://app-proyecto-api.vercel.app/api/eventos/obtener/${id}`);
      setSelectedEvento(response.data);
      setShowModal(true); // Muestra el modal con la información del evento seleccionado
    } catch (error) {
      console.error('Error fetching evento:', error);
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedEvento(null);
  };

  // Función para ir al evento anterior en el slider
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? eventos.length - 1 : prevIndex - 1));
  };

  // Función para ir al siguiente evento en el slider
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
        <Navbar /> {/* Componente Navbar */}
      </div>
      <div className="featured" style={featuredStyle}></div> {/* Área destacada */}
      <div className="cards-container">
        <button className="arrow arrow-left" onClick={goToPrevious}>&#8249;</button> {/* Botón para ir al evento anterior */}
        <div className="slider">
          <div className="cards" style={{ transform: `translateX(-${currentIndex * (100 / eventos.length)}%), width: ${100 * eventos.length}%` }}>
            {eventos.map((evento, index) => (
              <Card
                key={evento._id}
                image={evento.imagen || 'https://via.placeholder.com/150'} // Imagen del evento o un placeholder
                title={evento.nombre} // Nombre del evento
                description={evento.descripcion} // Descripción del evento
                onClick={() => handleCardClick(evento._id)} // Maneja el clic en la tarjeta
              />
            ))}
          </div>
        </div>
        <button className="arrow arrow-right" onClick={goToNext}>&#8250;</button> {/* Botón para ir al siguiente evento */}
      </div>
      {showModal && selectedEvento && ( // Modal para mostrar detalles del evento seleccionado
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span> {/* Botón para cerrar el modal */}
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
