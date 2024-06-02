import React, { useState, useEffect } from 'react';
import './gestionar.scss';
import Menu from "../../components/MenuOrganizador/Menu";
import Select from 'react-select';
import axios from 'axios';
 
const GestionarEventos = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false); // Estado para controlar el modal de creación de eventos

  const fetchEvents = () => {
    fetch('https://app-proyecto.vercel.app/api/eventos/obtener')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error al obtener los eventos:', error));
  };

  useEffect(() => {
    fetchEvents();

    fetch('https://app-proyecto.vercel.app/api/categorias/obtener')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error al obtener las categorías:', error));

    fetch('https://app-proyecto.vercel.app/api/rutas/obtener')
      .then(response => response.json())
      .then(data => setRoutes(data))
      .catch(error => console.error('Error al obtener las rutas:', error));
  }, []);

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleDelete = (event) => {
    setDeletingEvent(event);
  };

  const confirmDelete = () => {
    fetch(`https://app-proyecto.vercel.app/api/eventos/eliminar/${deletingEvent._id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        setEvents(events.filter(event => event._id !== deletingEvent._id));
        setDeletingEvent(null);
      })
      .catch(error => console.error('Error al eliminar el evento:', error));
  };

  const saveEdit = (formData) => {
    axios.patch(`https://app-proyecto.vercel.app/api/eventos/actualizar/${editingEvent._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        fetchEvents(); // Refrescar los eventos después de guardar
        setEditingEvent(null);
      })
      .catch(error => console.error('Error al actualizar el evento:', error));
  };

  return (
    <div>
      <Menu />
      <div className="gestionar-eventos">
        <h1>Gestionar Eventos</h1>
        <div className="button-container">
          <button onClick={() => setIsCreating(true)} className="new-event-button">Nuevo Evento</button>
        </div>
        <ul className="event-list">
          {events.map(event => (
            <li key={event._id} className="event-item">
              <span>{event.nombre} - {new Date(event.fecha).toLocaleDateString()}</span>
              <button onClick={() => handleEdit(event)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(event)} className="delete-button">Eliminar</button>
            </li>
          ))}
        </ul>

        {editingEvent && (
          <EditEventModal 
            event={editingEvent}
            categories={categories}
            routes={routes}
            onSave={saveEdit}
            onCancel={() => setEditingEvent(null)}
          />
        )}

        {deletingEvent && (
          <DeleteEventModal
            event={deletingEvent}
            onConfirm={confirmDelete}
            onCancel={() => setDeletingEvent(null)}
          />
        )}

        {isCreating && (
          <CreateEventModal 
            categories={categories}
            routes={routes}
            onClose={() => setIsCreating(false)}
            onEventCreated={fetchEvents} // Refrescar eventos después de crear uno nuevo
          />
        )}
      </div>
    </div>
  );
};
const EditEventModal = ({ event, categories, routes, onSave, onCancel }) => {
  const [nombre, setNombre] = useState(event.nombre);
  const [fecha, setFecha] = useState(new Date(event.fecha).toISOString().split('T')[0]);
  const [lugar, setLugar] = useState(event.lugar);
  const [selectedCategories, setSelectedCategories] = useState(event.categorias.map(cat => ({ value: cat._id, label: cat.nombre })));
  const [selectedRoutes, setSelectedRoutes] = useState(event.rutas.map(route => ({ value: route._id, label: route.nombre })));
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSave = () => {
    const updatedEvent = {
      nombre,
      fecha,
      lugar,
      categorias: JSON.stringify(selectedCategories.map(cat => cat.value)),
      rutas: JSON.stringify(selectedRoutes.map(route => route.value))
    };

    const formData = new FormData();
    formData.append('nombre', updatedEvent.nombre);
    formData.append('fecha', updatedEvent.fecha);
    formData.append('lugar', updatedEvent.lugar);
    formData.append('categorias', updatedEvent.categorias);
    formData.append('rutas', updatedEvent.rutas);
    if (selectedFile) {
      formData.append('imagen', selectedFile);
    }

    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Evento</h2>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Fecha:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>
        <label>
          Lugar:
          <input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)} />
        </label>
        <label>
          Imagen:
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </label>
        <label>
          Categorías:
          <Select
            isMulti
            options={categories.map(cat => ({ value: cat._id, label: cat.nombre }))}
            value={selectedCategories}
            onChange={setSelectedCategories}
            placeholder="Selecciona categorías"
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
          />
        </label>
        <label>
          Rutas:
          <Select
            isMulti
            options={routes.map(route => ({ value: route._id, label: route.nombre }))}
            value={selectedRoutes}
            onChange={setSelectedRoutes}
            placeholder="Selecciona rutas"
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
          />
        </label>
        <button onClick={handleSave} className="save-button">Guardar</button>
        <button onClick={onCancel} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};

const DeleteEventModal = ({ event, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Eliminar Evento</h2>
        <p>¿Estás seguro de que deseas eliminar el evento "{event.nombre}"?</p>
        <button onClick={onConfirm} className="confirm-button">Eliminar</button>
        <button onClick={onCancel} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};

const CreateEventModal = ({ categories, routes, onClose, onEventCreated }) => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [lugar, setLugar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [selectedRutas, setSelectedRutas] = useState([]);
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('imagen', selectedFile);
      formData.append('nombre', nombre);
      formData.append('fecha', fecha);
      formData.append('lugar', lugar);
      formData.append('categorias', JSON.stringify(selectedCategorias.map(cat => cat.value)));
      formData.append('rutas', JSON.stringify(selectedRutas.map(ruta => ruta.value)));
  
      const response = await axios.post('https://app-proyecto-api.vercel.app/api/eventos/crear', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Evento creado:', response.data);
      onEventCreated(); // Refrescar eventos después de crear uno nuevo
      onClose(); // Cerrar el modal
    } catch (error) {
      if (error.response) {
        console.error('Error al crear el evento:', error.response.data);
      } else {
        console.error('Error al crear el evento:', error.message);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Crear Nuevo Evento</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </label>
          <label>
            Fecha:
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          </label>
          <label>
            Lugar:
            <input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)} required />
          </label>
          <label>
            Imagen:
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} required />
          </label>
          <label>
            Categorías:
            <Select
              isMulti
              options={categories.map(cat => ({ value: cat._id, label: cat.nombre }))}
              value={selectedCategorias}
              onChange={setSelectedCategorias}
              placeholder="Selecciona categorías"
            />
          </label>
          <label>
            Rutas:
            <Select
              isMulti
              options={routes.map(route => ({ value: route._id, label: route.nombre }))}
              value={selectedRutas}
              onChange={setSelectedRutas}
              placeholder="Selecciona rutas"
            />
          </label>
          <button type="submit">Crear Evento</button>
          <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default GestionarEventos;