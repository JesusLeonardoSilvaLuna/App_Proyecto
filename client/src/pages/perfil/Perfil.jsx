import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './perfil.scss';
import { FaUserCircle, FaBars, FaCamera, FaPlus } from 'react-icons/fa';
import { Image } from 'cloudinary-react';
import Modal from 'react-modal';

const Perfil = () => {
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false); // Nuevo estado para el modal de previsualización
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');

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
        const res = await axios.get(`https://app-proyecto-api.vercel.app/api/users/find/${userId}`, {
          headers: { 
            'Authorization': 'Bearer ' + token
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error al obtener el usuario:', err);
      }
    };

    fetchUser();
  }, [userId, token]);

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

      const res = await axios.put(`https://app-proyecto-api.vercel.app/api/users/update-images/${userId}`, formData, {
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

  return (
    <div className="perfil">
      <nav className={`navbar ${isModalOpen ? 'scrolled' : ''}`}>
        <div className="navbar-icons">
          <FaUserCircle size={30} />
          <FaBars size={30} />
        </div>
      </nav>
      <div className="cover-container">
        <div className="cover-card">
          {user.coverPic && (
            <Image cloudName="tuCloudName" publicId={user.coverPic} alt="Cover" />
          )}
        </div>
        <div className="profile-card">
          {user.profilePic && (
            <Image cloudName="tuCloudName" publicId={user.profilePic} alt="Profile" />
          )}
          <button className="camera-button" onClick={openModal}>
            <FaCamera size={20} />
          </button>
        </div>
      </div>
      <div className="user-info">
        <h2>{user.username}</h2>
      </div>

      {/* Contenedor de detalles */}
      <div className="details-container">
        <h2>Detalles del Usuario</h2>
        <div className="user-details">
          <p><strong>Nombre de usuario:</strong> {user.username}</p>
          <p><strong>Rol:</strong> {user.role || "Ciclista"}</p>
          <p><strong>Dirección:</strong> Calle Ficticia, Nº 123</p>
          <p><strong>Correo Electrónico:</strong> {user.email}</p>
          <p><strong>Número de Teléfono:</strong> +1234567890</p>
        </div>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Seleccionar Imagen"
        className="modal"
        overlayClassName="overlay"
appElement={document.getElementById('root')} // Configurar el elemento principal
      >
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>X</button>
          <h2 className="section-title">Elegir foto de perfil</h2>
          <hr className="divider" />
          <div className="upload-section">
            <button className="upload-button" onClick={() => document.getElementById('fileInput').click()}>
              <FaPlus size={20} /> Subir Foto
            </button>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setProfilePic(e.target.files[0])}
              accept="image/*"
            />
          </div>
          {uploadedProfilePic && ( // Mostrar la imagen seleccionada
            <div className="image-list">
              <div className="image-item">
                <img src={uploadedProfilePic} alt="Perfil subido" />
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
        </div>
      </Modal>

      <Modal
        isOpen={previewModalOpen} // Nuevo modal para previsualización
        onRequestClose={closePreviewModal}
        contentLabel="Vista Previa"
        className="modal"
        overlayClassName="overlay"
        appElement={document.getElementById('root')}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={closePreviewModal}>X</button>
          <h2 className="section-title">Previsualización de la imagen</h2>
          <hr className="divider" />
          <div className="preview-section">
            {uploadedProfilePic && (
              <div className="preview-image-item">
                <img src={uploadedProfilePic} alt="Previsualización" />
              </div>
            )}
          </div>
          <div className="button-section">
            <button onClick={closePreviewModal}>Cancelar</button>
            <button onClick={handleImageUpload}>Guardar</button>
          </div>
        </div>
      </Modal>
      
    </div>
  );
};

export default Perfil;