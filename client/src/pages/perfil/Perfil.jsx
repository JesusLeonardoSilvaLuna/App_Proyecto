import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './perfil.scss';
import { FaCamera, FaPlus, FaUser, FaEnvelope, FaPhone, FaUserTag, FaHome } from 'react-icons/fa';
import { Image } from 'cloudinary-react';
import Modal from 'react-modal';
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Perfil = () => {
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [randomEvents, setRandomEvents] = useState([]); // Nuevo estado para los eventos aleatorios
  const [selectedEvent, setSelectedEvent] = useState(null); // Nuevo estado para el evento seleccionado
  const [eventModalOpen, setEventModalOpen] = useState(false); // Estado para controlar la apertura del modal de detalles del evento
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');
  const [coverPic, setCoverPic] = useState(null);
  const [uploadedCoverPic, setUploadedCoverPic] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);
  
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    if (!userId) {
      console.error('No userId found in localStorage');
      return;
    }

    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/find/${userId}`, {
          headers: {
            'Authorization': 'Bearer ' + token
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error al obtener el usuario:', err);
      }
    };

    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/evento/obtener`, {
          headers: {
            'Authorization': 'Bearer ' + token
          },
        });
        setRandomEvents(getRandomEvents(res.data)); // Seleccionar eventos aleatorios
      } catch (err) {
        console.error('Error al obtener los eventos:', err);
      }
    };

    fetchUser();
    fetchEvents();
  }, [userId, token]);

  const getRandomEvents = (events) => {
    if (events.length <= 2) return events;
    const shuffled = [...events].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      if (!userId) {
        console.error('No userId found in localStorage');
        return;
      }
const res = await axios.put(`http://localhost:8800/api/users/update-images/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token
        },
      });
      setUser(res.data);
      setUploadedProfilePic(URL.createObjectURL(profilePic)); // Mostrar la imagen seleccionada
      setPreviewModalOpen(true); // Abrir el modal de previsualización
    } catch (err) {
      console.error('Error al actualizar imágenes:', err.response?.data || err.message);
    }
  };

  const handleCoverUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (coverPic) {
      formData.append('coverPic', coverPic);
    }

    try {
      if (!userId) {
        console.error('No userId found in localStorage');
        return;
      }

      const res = await axios.put(`http://localhost:8800/api/users/update-images/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token
        },
      });
      setUser(res.data);
      setUploadedCoverPic(URL.createObjectURL(coverPic)); // Mostrar la imagen seleccionada
      setPreviewModalOpen(true); // Abrir el modal de previsualización
    } catch (err) {
      console.error('Error al actualizar imágenes:', err.response?.data || err.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadedProfilePic(null); // Limpiar la imagen seleccionada al cerrar el modal
  };

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setEventModalOpen(true);
  };

  const closeEventModal = () => {
    setEventModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="perfil">
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <Link to="/" className="home-link">
              <FaHome size={40} />
            </Link>
            
          </div>
          <span className="title-perfil">Perfil</span>
          <div className="right">
            {user.profilePic && (
              <Image
                cloudName="tuCloudName"
                publicId={user.profilePic}
                alt="Profile"
                width="150"
                height="150"
                crop="fill"
                gravity="face"
              />
            )}
            <div className="profile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <ArrowDropDownIcon className="icon" />
              <div className={isMenuOpen ? "options open" : "options"}>
                <span>Crear equipo</span>
                <span onClick={() => dispatch(logout())}>Cerrar Sesion</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cover-container">
        <div className="cover-card">
          {user.coverPic && (
            <Image cloudName="tuCloudName" publicId={user.coverPic} alt="Cover" />
          )}
        </div>
      </div>
      <div className="profile-card">
        {user.profilePic && (
          <Image cloudName="tuCloudName" publicId={user.profilePic} alt="Profile" />
        )}
        <button className="camera-button" onClick={openModal}>
          <FaCamera size={20} />
        </button>
      </div>
      <div className="user-info">
        <h2>{user.username}</h2>
      </div>
{/* Contenedor de detalles */}
      <div className="details-container">
        <h2>Detalles del Usuario</h2>
        <hr className="divider" />
        <div className="user-details">
          <div className="detail-item">
            <FaUser className="detail-icon" />
            <p><span className="detail-label">Nombre de usuario:</span> {user.username}</p>
          </div>
          <div className="detail-item">
            <FaUserTag className="detail-icon" />
            <p><span className="detail-label">Rol:</span> {user.role || 'Ciclista'}</p>
          </div>
          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <p><span className="detail-label">Correo Electrónico:</span> {user.email}</p>
          </div>
          <div className="detail-item">
            <FaPhone className="detail-icon" />
            <p><span className="detail-label">Número de Teléfono:</span> +1234567890</p>
          </div>
        </div>
        <button className="edit-button">Editar Detalles</button>
      </div>

      {/* Nuevo contenedor de eventos */}
      <div className="events-container">
        <h2>Eventos</h2>
        <hr className="divider" />
        <ul className="event-list">
          {randomEvents.map(event => (
            <li key={event._id} className="event-item" onClick={() => openEventModal(event)}>
              <div className="event-details">
                <p className="event-name">{event.nombre}</p>
                <p className="event-date">{new Date(event.fecha).toLocaleDateString()}</p>
              </div>
              <img src={event.imagen} alt={event.nombre} className="event-image"/>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Seleccionar Imagen"
        className="modal"
        overlayClassName="overlay"
        appElement={document.getElementById('root')}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>X</button>
          <h2 className="section-title">Elegir foto de perfil o portada</h2>
          <hr className="divider" />
          <div className="upload-section">
            <button className="upload-button" onClick={() => document.getElementById('fileInput').click()}>
              <FaPlus size={20} /> Subir Foto de Perfil
            </button>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setProfilePic(e.target.files[0])}
              accept="image/*"
            />
            <button className="upload-button" onClick={() => document.getElementById('coverInput').click()}>
              <FaPlus size={20} /> Subir Foto de Portada
            </button>
            <input
              type="file"
              id="coverInput"
              style={{ display: 'none' }}
              onChange={(e) => setCoverPic(e.target.files[0])}
              accept="image/*"
            />
          </div>
          {uploadedProfilePic && (
            <div className="image-list">
              <div className="image-item">
                <img src={uploadedProfilePic} alt="Perfil subido" />
              </div>
            </div>
          )}
          {uploadedCoverPic && (
            <div className="image-list">
              <div className="image-item">
                <img src={uploadedCoverPic} alt="Portada subida" />
              </div>
            </div>
          )}
          <h2 className="section-title">Mis fotos</h2>
          <div className="image-list">
            {user.profilePic && (
              <div className="image-item">
                <Image cloudName="tuCloudName" publicId={user.profilePic} alt="Profile" />
              </div>
            )}
            {user.coverPic && (
              <div className="image-item">
                <Image cloudName="tuCloudName" publicId={user.coverPic} alt="Cover" />
              </div>
            )}
          </div>
          <div className="buttons-container">
            <button className="save-button" onClick={handleImageUpload}>Guardar Foto de Perfil</button>
            <button className="save-button" onClick={handleCoverUpload}>Guardar Foto de Portada</button>
            <button className="cancel-button" onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      </Modal>

      {previewModalOpen && (
        <Modal
          isOpen={previewModalOpen}
          onRequestClose={closePreviewModal}
          contentLabel="Previsualizar Imagen"
          className="modal preview"
          overlayClassName="overlay"
          appElement={document.getElementById('root')}
        >
          <div className="modal-content">
            <button className="modal-close" onClick={closePreviewModal}>X</button>
            <h2 className="section-title">Previsualizar Imagen</h2>
            <hr className="divider" />
            {uploadedProfilePic && (
              <img src={uploadedProfilePic} alt="Previsualización" />
            )}
            <div className="buttons-container">
              <button className="cancel-button" onClick={closePreviewModal}>Cerrar</button>
            </div>
          </div>
        </Modal>
      )}

      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEventModal}>&times;</span>
            <div>
              <h2>{selectedEvent.nombre}</h2>
            </div>
            <div className="imagen">
              <img src={selectedEvent.imagen || 'https://via.placeholder.com/150'} alt={selectedEvent.nombre} />
            </div>
            <div className="evento-detalle">
              <div className="detalles">
                <p>{selectedEvent.descripcion}</p>
                <p><strong>Fecha:</strong> {new Date(selectedEvent.fecha).toLocaleDateString()}</p>
                <p><strong>Lugar:</strong> {selectedEvent.lugar}</p>
                <p><strong>Categorías:</strong> {selectedEvent.categorias.map(cat => cat.nombre).join(', ')}</p>
                <p><strong>Rutas:</strong> {selectedEvent.rutas.map(ruta => ruta.nombre).join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
