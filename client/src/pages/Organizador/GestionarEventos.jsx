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
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [editingRoute, setEditingRoute] = useState(null);
  const [deletingRoute, setDeletingRoute] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchEvents = () => {
    fetch('https://app-proyecto-api.vercel.app/api/eventos/obtener')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error al obtener los eventos:', error));
  };

  const fetchCategories = () => {
    fetch('https://app-proyecto-api.vercel.app/api/categorias/obtener')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error al obtener las categorías:', error));
  };

  const fetchRoutes = () => {
    fetch('https://app-proyecto-api.vercel.app/api/rutas/obtener')
      .then(response => response.json())
      .then(data => setRoutes(data))
      .catch(error => console.error('Error al obtener las rutas:', error));
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories();
    fetchRoutes();
  }, []);

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleDeleteEvent = (event) => {
    setDeletingEvent(event);
  };

  const confirmDeleteEvent = () => {
    fetch(`https://app-proyecto-api.vercel.app/api/eventos/eliminar/${deletingEvent._id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        setEvents(events.filter(event => event._id !== deletingEvent._id));
        setDeletingEvent(null);
      })
      .catch(error => console.error('Error al eliminar el evento:', error));
  };

  const saveEditEvent = (formData) => {
    axios.patch(`https://app-proyecto-api.vercel.app/api/eventos/actualizar/${editingEvent._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        fetchEvents();
        setEditingEvent(null);
      })
      .catch(error => console.error('Error al actualizar el evento:', error));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleDeleteCategory = (category) => {
    setDeletingCategory(category);
  };

  const confirmDeleteCategory = () => {
    fetch(`https://app-proyecto-api.vercel.app/api/categorias/eliminar/${deletingCategory._id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        setCategories(categories.filter(category => category._id !== deletingCategory._id));
        setDeletingCategory(null);
      })
      .catch(error => console.error('Error al eliminar la categoría:', error));
  };

  const saveEditCategory = (categoryData) => {
    axios.patch(`https://app-proyecto-api.vercel.app/api/categorias/actualizar/${editingCategory._id}`, categoryData)
      .then(() => {
        fetchCategories();
        setEditingCategory(null);
      })
      .catch(error => console.error('Error al actualizar la categoría:', error));
  };

  const handleEditRoute = (route) => {
    setEditingRoute(route);
  };

  const handleDeleteRoute = (route) => {
    setDeletingRoute(route);
  };

  const confirmDeleteRoute = () => {
    fetch(`https://app-proyecto-api.vercel.app/api/rutas/eliminar/${deletingRoute._id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        setRoutes(routes.filter(route => route._id !== deletingRoute._id));
        setDeletingRoute(null);
      })
      .catch(error => console.error('Error al eliminar la ruta:', error));
  };
const saveEditRoute = (routeData) => {
    axios.patch(`https://app-proyecto-api.vercel.app/api/rutas/actualizar/${editingRoute._id}`, routeData)
      .then(() => {
        fetchRoutes();
        setEditingRoute(null);
      })
      .catch(error => console.error('Error al actualizar la ruta:', error));
  };

  return (
    <div className="BG">
      <Menu />
      <div className="gestionar-eventos">
        <h1>Gestion de Eventos</h1>
        <div className="button-container">
          <button onClick={() => setIsCreating(true)} className="new-event-button">Nuevo Evento</button>
        </div>
        <ul className="event-list">
          {events.map(event => (
            <li key={event._id} className="event-item">
              <span>{event.nombre} - {new Date(event.fecha).toLocaleDateString()}</span>
              <button onClick={() => handleEditEvent(event)} className="edit-button">Editar</button>
              <button onClick={() => handleDeleteEvent(event)} className="delete-button">Eliminar</button>
            </li>
          ))}
        </ul>

        <div className="categories-container">
          <h1>Categorías</h1>
          <hr />
          <ul className="category-list">
            {categories.map(category => (
              <li key={category._id} className="category-item" onClick={() => setEditingCategory(category)}>
                <span>{category.nombre}</span>
              </li>
            ))}
          </ul>

          {editingCategory && (
            <EditCategoryModal
              category={editingCategory}
              onSave={saveEditCategory}
              onDelete={handleDeleteCategory}
              onClose={() => setEditingCategory(null)}
            />
          )}

          {deletingCategory && (
            <DeleteCategoryModal
              category={deletingCategory}
              onConfirm={confirmDeleteCategory}
              onCancel={() => setDeletingCategory(null)}
            />
          )}
        </div>

        <div className="routes-container">
          <h1>Rutas</h1>
          <hr />
          <ul className="route-list">
            {routes.map(route => (
              <li key={route._id} className="route-item" onClick={() => setEditingRoute(route)}>
                <span>{route.nombre} - {route.distancia} km</span>
              </li>
            ))}
          </ul>

          {editingRoute && (
            <EditRouteModal
              route={editingRoute}
              onSave={saveEditRoute}
              onDelete={handleDeleteRoute}
              onClose={() => setEditingRoute(null)}
            />
          )}

          {deletingRoute && (
            <DeleteRouteModal
              route={deletingRoute}
              onConfirm={confirmDeleteRoute}
              onCancel={() => setDeletingRoute(null)}
            />
          )}
        </div>

        {isCreating && (
          <CreateEventModal
            categories={categories}
            routes={routes}
            onClose={() => setIsCreating(false)}
            onEventCreated={fetchEvents}
          />
        )}

        {editingEvent && (
          <EditEventModal
            event={editingEvent}
            categories={categories}
            routes={routes}
            onSave={saveEditEvent}
            onCancel={() => setEditingEvent(null)}
          />
        )}

        {deletingEvent && (
          <DeleteEventModal
            event={deletingEvent}
            onConfirm={confirmDeleteEvent}
            onCancel={() => setDeletingEvent(null)}
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
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('fecha', fecha);
    formData.append('lugar', lugar);
    formData.append('categorias', selectedCategories.map(cat => cat.value).join(','));
    formData.append('rutas', selectedRoutes.map(route => route.value).join(','));
    if (selectedFile) {
      formData.append('imagen', selectedFile);
    }
    onSave(formData);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
          Categorías:
          <Select
            isMulti
            options={categories.map(cat => ({ value: cat._id, label: cat.nombre }))}
            value={selectedCategories}
            onChange={setSelectedCategories}
          />
        </label>
        <label>
          Rutas:
          <Select
            isMulti
            options={routes.map(route => ({ value: route._id, label: route.nombre }))}
            value={selectedRoutes}
            onChange={setSelectedRoutes}
          />
        </label>
        <label>
          Imagen:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

const CreateEventModal = ({ categories, routes, onClose, onEventCreated }) => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [lugar, setLugar] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSave = () => {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('fecha', fecha);
    formData.append('lugar', lugar);
    formData.append('categorias', selectedCategories.map(cat => cat.value).join(','));
    formData.append('rutas', selectedRoutes.map(route => route.value).join(','));
    if (selectedFile) {
      formData.append('imagen', selectedFile);
    }

    axios.post('https://app-proyecto-api.vercel.app/api/eventos/crear', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        onEventCreated();
        onClose();
      })
      .catch(error => console.error('Error al crear el evento:', error));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
return (
    <div className="modal">
      <div className="modal-content">
        <h2>Crear Nuevo Evento</h2>
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
          Categorías:
          <Select
            isMulti
            options={categories.map(cat => ({ value: cat._id, label: cat.nombre }))}
            value={selectedCategories}
            onChange={setSelectedCategories}
          />
        </label>
        <label>
          Rutas:
          <Select
            isMulti
            options={routes.map(route => ({ value: route._id, label: route.nombre }))}
            value={selectedRoutes}
            onChange={setSelectedRoutes}
          />
        </label>
        <label>
          Imagen:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

const DeleteEventModal = ({ event, onConfirm, onCancel }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Eliminar Evento</h2>
      <p>¿Estás seguro de que quieres eliminar el evento {event.nombre}?</p>
      <button onClick={onConfirm}>Sí, eliminar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  </div>
);

const EditCategoryModal = ({ category, onSave, onDelete, onClose }) => {
  const [nombre, setNombre] = useState(category.nombre);
  const [descripcion, setDescripcion] = useState(category.descripcion);
  const [edadMinima, setEdadMinima] = useState(category.edadMinima);
  const [edadMaxima, setEdadMaxima] = useState(category.edadMaxima);
  const [sexo, setSexo] = useState(category.sexo);
  const [nivel, setNivel] = useState(category.nivel);

  const handleSave = () => {
    onSave({ nombre, descripcion, edadMinima, edadMaxima, sexo, nivel });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Categoría</h2>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Descripción:
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <label>
          Edad Mínima:
          <input type="number" value={edadMinima} onChange={(e) => setEdadMinima(e.target.value)} />
        </label>
        <label>
          Edad Máxima:
          <input type="number" value={edadMaxima} onChange={(e) => setEdadMaxima(e.target.value)} />
        </label>
        <label>
          Sexo:
          <input type="text" value={sexo} onChange={(e) => setSexo(e.target.value)} />
        </label>
        <label>
          Nivel:
          <input type="text" value={nivel} onChange={(e) => setNivel(e.target.value)} />
        </label>
        <button onClick={handleSave} className="save-button">Guardar</button>
        <button onClick={onDelete} className="delete-button">Eliminar</button>
        <button onClick={onClose} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};

const DeleteCategoryModal = ({ category, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Eliminar Categoría</h2>
        <p>¿Estás seguro de que deseas eliminar la categoría "{category.nombre}"?</p>
        <button onClick={onConfirm} className="confirm-button">Eliminar</button>
        <button onClick={onCancel} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};
const EditRouteModal = ({ route, onSave, onDelete, onClose }) => {
  const [nombre, setNombre] = useState(route.nombre);
  const [distancia, setDistancia] = useState(route.distancia);
  const [puntosDeControl, setPuntosDeControl] = useState(route.puntosDeControl.join(', '));
  const [dificultad, setDificultad] = useState(route.dificultad);
  const [descripcion, setDescripcion] = useState(route.descripcion);
  const [coordenadas, setCoordenadas] = useState(route.coordenadas.join(', '));

  const handleSave = () => {
    onSave({ nombre, distancia, puntosDeControl: puntosDeControl.split(',').map(point => point.trim()), dificultad, descripcion, coordenadas: coordenadas.split(',').map(coord => parseFloat(coord.trim())) });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Ruta</h2>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Distancia (km):
          <input type="number" value={distancia} onChange={(e) => setDistancia(e.target.value)} />
        </label>
        <label>
          Puntos de Control:
          <input type="text" value={puntosDeControl} onChange={(e) => setPuntosDeControl(e.target.value)} />
        </label>
        <label>
          Dificultad:
          <input type="text" value={dificultad} onChange={(e) => setDificultad(e.target.value)} />
        </label>
        <label>
          Descripción:
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
        <label>
          Coordenadas (Longitud, Latitud):
          <input type="text" value={coordenadas} onChange={(e) => setCoordenadas(e.target.value)} />
        </label>
        <button onClick={handleSave} className="save-button">Guardar</button>
        <button onClick={onDelete} className="delete-button">Eliminar</button>
        <button onClick={onClose} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};

const DeleteRouteModal = ({ route, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Eliminar Ruta</h2>
        <p>¿Estás seguro de que deseas eliminar la ruta "{route.nombre}"?</p>
        <button onClick={onConfirm} className="confirm-button">Eliminar</button>
        <button onClick={onCancel} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
};

export default GestionarEventos;
