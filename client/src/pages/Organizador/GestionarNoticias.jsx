import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gestionar.scss';
import Menu from "../../components/MenuOrganizador/Menu";
import { FaTrashAlt } from 'react-icons/fa';

const GestionarNoticias = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://app-proyecto.vercel.app/api/news/obtener');
      setNewsList(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSelectNews = (news) => {
    setSelectedNews(news);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
    setIsCreating(false);
    fetchNews(); // Refresh news list
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching news: {error.message}</div>;
  }

  return (
    <div>
      <Menu />
      <div className="gestionar-noticias">
        <h1>Gestionar Noticias</h1>
        <div className="button-container">
          <button onClick={handleCreate} className="new-news-button">Nueva Noticia</button>
        </div>
        <ul className="news-list">
          {Array.isArray(newsList) && newsList.length > 0 ? (
            newsList.map(news => (
              <li key={news._id} className="news-item" onClick={() => handleSelectNews(news)}>
                <span>{news.title} - {new Date(news.date).toLocaleDateString()}</span>
              </li>
            ))
          ) : (
            <div>No hay noticias disponibles</div>
          )}
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

const NewsModal = ({ news, onClose }) => {
  const [title, setTitle] = useState(news.title);
  const [content, setContent] = useState(news.content);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      await axios.put(`https://app-proyecto.vercel.app/api/news/actualizar/${news._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onClose();
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://app-proyecto.vercel.app/api/news/eliminar/${news._id}`);
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

const CreateNewsModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      await axios.post('https://app-proyecto.vercel.app/api/news/crear', formData, {
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