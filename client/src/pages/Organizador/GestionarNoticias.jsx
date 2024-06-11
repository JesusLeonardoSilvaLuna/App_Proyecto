import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gestionar.scss';
import Menu from "../../components/MenuOrganizador/Menu";
import { FaTrashAlt } from 'react-icons/fa'; 

// Componente principal para gestionar noticias
const GestionarNoticias = () => {
  const [newsList, setNewsList] = useState([]); // Estado para almacenar la lista de noticias
  const [selectedNews, setSelectedNews] = useState(null); // Estado para almacenar la noticia seleccionada
  const [isCreating, setIsCreating] = useState(false); // Estado para controlar si se está creando una nueva noticia

  // Función para obtener la lista de noticias desde la API
  const fetchNews = async () => {
    try {
      const response = await axios.get('https://app-proyecto-api.vercel.app/api/news/obtener');
      setNewsList(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // useEffect para obtener las noticias al montar el componente
  useEffect(() => {
    fetchNews();
  }, []);

  // Función para manejar la creación de una nueva noticia
  const handleCreate = () => {
    setIsCreating(true);
  };

  // Función para seleccionar una noticia para editarla
  const handleSelectNews = (news) => {
    setSelectedNews(news);
  };

  // Función para cerrar el modal de edición o creación y actualizar la lista de noticias
  const handleCloseModal = () => {
    setSelectedNews(null);
    setIsCreating(false);
    fetchNews(); // Refrescar la lista de noticias
  };

  return (
    <div>
      <Menu />
      <div className="gestionar-noticias">
        <h1>Gestionar Noticias</h1>
        <div className="button-container">
          <button onClick={handleCreate} className="new-news-button">Nueva Noticia</button>
        </div>
        <ul className="news-list">
          {newsList.map(news => (
            <li key={news._id} className="news-item" onClick={() => handleSelectNews(news)}>
              <span>{news.title} - {new Date(news.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>

        {selectedNews && (
          <NewsModal
            news={selectedNews}
            onClose={handleCloseModal}
          />
        )}

        {isCreating && (
          <CreateNewsModal
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

// Componente para el modal de edición de noticias
const NewsModal = ({ news, onClose }) => {
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  const [selectedFile, setSelectedFile] = useState(null);

  // Función para guardar los cambios en la noticia
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      await axios.put(`https://app-proyecto-api.vercel.app/api/news/actualizar/${news._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onClose();
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  // Función para eliminar la noticia
  const handleDelete = async () => {
    try {
      await axios.delete(`https://app-proyecto-api.vercel.app/api/news/eliminar/${news._id}`);
      onClose();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };
return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Noticia</h2>
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Contenido:
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </label>
        <label>
          Imagen:
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </label>
        <div className="modal-actions">
          <button onClick={handleSave} className="save-button">Guardar</button>
          <button onClick={onClose} className="cancel-button">Cancelar</button>
          <FaTrashAlt onClick={handleDelete} className="delete-icon" />
        </div>
      </div>
    </div>
  );
};

// Componente para el modal de creación de noticias
const CreateNewsModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Función para crear una nueva noticia
  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      await axios.post('https://app-proyecto-api.vercel.app/api/news/crear', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onClose();
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Crear Nueva Noticia</h2>
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Contenido:
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </label>
        <label>
          Imagen:
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </label>
        <button onClick={handleCreate} className="create-button">Crear</button>
        <button onClick={onClose} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};

export default GestionarNoticias;
