import React, { useState, useEffect } from 'react';
import './gestionar.scss';
import Menu from "../../components/MenuOrganizador/Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de tachita

const GestionarInscripciones = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [selectedInscription, setSelectedInscription] = useState(null);
  const [filterState, setFilterState] = useState(''); // Estado del filtro
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda

  useEffect(() => {
    fetch('https://app-proyecto-api.vercel.app/api/inscripciones/obtener')
      .then(response => response.json())
      .then(data => setInscriptions(data))
      .catch(error => console.error('Error al obtener las inscripciones:', error));
  }, []);

  const updateInscriptionStatus = (inscriptionId, status) => {
    console.log('Enviando solicitud PATCH al servidor...');
    fetch(`https://app-proyecto-api.vercel.app/api/inscripciones/actualizar/${inscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ estado: status }) // Cambiar 'status' a 'estado'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        console.log('Respuesta del servidor recibida con éxito.');
        return response.json();
      })
      .then(updatedInscription => {
        console.log('Inscripción actualizada correctamente:', updatedInscription);
        setInscriptions(inscriptions.map(inscription => 
          inscription._id === updatedInscription._id ? updatedInscription : inscription
        ));
        setSelectedInscription(updatedInscription); // Actualizar la inscripción seleccionada después de actualizar el estado
      })
      .catch(error => console.error('Error al actualizar la inscripción:', error));
  };
  

  const handleInscriptionSelect = (inscription) => {
    setSelectedInscription(inscription);
  };

  const handleCloseDetails = () => {
    setSelectedInscription(null);
  };

  const handleAcceptInscription = () => {
    const { nombre, apellidos, edad, genero, direccion, correo, numero, seguroSocial, contactoEmergencia } = selectedInscription;
    const newCyclist = { nombre, apellidos, edad, genero, direccion, correo, numero, seguroSocial, contactoEmergencia };
    
    // Enviar la solicitud para crear un ciclista
    fetch('https://app-proyecto-api.vercel.app/api/ciclista/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCyclist)
    })
      .then(response => response.json())
      .then(_createdCyclist => {
        // Actualizar el estado de la inscripción a 'Aceptada' en la base de datos
        updateInscriptionStatus(selectedInscription._id, 'Aceptada');
        // Mostrar mensaje de confirmación
        alert('La inscripción ha sido aceptada y el ciclista ha sido creado correctamente.');
      })
      .catch(error => console.error('Error al crear el ciclista:', error));
  };

  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar las inscripciones según el término de búsqueda y el filtro seleccionado
  const filteredInscriptions = inscriptions.filter(inscription =>
    inscription.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterState === '' || inscription.estado === filterState)
  );
return (
    <div>
      <Menu />
      <div className="gestionar-inscripciones">
        <h1 className="title">Gestionar Inscripciones</h1>
        {/* Buscador */}
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {/* Filtro */}
          <select value={filterState} onChange={handleFilterChange} className="filter-select">
            <option value="">Todos</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Aceptada">Aceptadas</option>
            <option value="Rechazada">Rechazadas</option>
          </select>
        </div>
        <ul className="inscription-list">
        {filteredInscriptions.map(inscription => (
            <li 
            key={inscription._id} 
            className={`inscription-item ${inscription.estado === 'Pendiente' ? 'pendiente' : inscription.estado === 'Aceptada' ? 'aceptada' : inscription.estado === 'Rechazada' ? 'rechazada' : inscription.estado === 'Cancelada' ? 'cancelada' : ''}`}
            onClick={() => handleInscriptionSelect(inscription)}
            >
            {inscription.nombre}
            </li>
        ))}
        </ul>
        {/* Detalles de la inscripción */}
        {selectedInscription && (
          <div className="inscription-details">
            <div className="close-button" onClick={handleCloseDetails}>
              <FontAwesomeIcon icon={faTimes} /> {/* Utiliza el icono de tachita */}
            </div>
            <h2>Detalles de la inscripción</h2>
            <p><strong>Nombre:</strong> {selectedInscription.nombre}</p>
            <p><strong>Apellidos:</strong> {selectedInscription.apellidos}</p>
            <p><strong>Edad:</strong> {selectedInscription.edad}</p>
            <p><strong>Género:</strong> {selectedInscription.genero}</p>
            <p><strong>Dirección:</strong> {selectedInscription.direccion}</p>
            <p><strong>Correo:</strong> {selectedInscription.correo}</p>
            <p><strong>Número:</strong> {selectedInscription.numero}</p>
            <p><strong>Seguro Social:</strong> {selectedInscription.seguroSocial}</p>
            <p><strong>Contacto de Emergencia:</strong> {selectedInscription.contactoEmergencia.nombre} - {selectedInscription.contactoEmergencia.numero}</p>
            <p><strong>Estado:</strong> {selectedInscription.estado}</p>
            <div className="button-group">
              <button onClick={handleAcceptInscription} className="accept-button">Aceptar</button>
              <button onClick={() => updateInscriptionStatus(selectedInscription._id, 'Rechazada')} className="reject-button">Rechazar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionarInscripciones;