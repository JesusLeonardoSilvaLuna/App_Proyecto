import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar'; 
import Card from '../../components/card/Card';
import axios from 'axios';
import "./ciclistas.scss";

const Ciclistas = () => {
  const [ciclistas, setCiclistas] = useState([]);

  useEffect(() => {
    // Función asincrónica para obtener los ciclistas
    const fetchCiclistas = async () => {
      try {
        const response = await axios.get('https://app-proyecto-api.vercel.app/api/ciclista/obtener'); // Hacer la solicitud GET al backend
        setCiclistas(response.data); // Establecer los ciclistas en el estado
      } catch (error) {
        console.error('Error al obtener los ciclistas:', error);
      }
    };

    fetchCiclistas(); // Llamar a la función para obtener los ciclistas al cargar el componente
  }, []);

  // Estilo para el área destacada
  const featuredStyle = {
    backgroundImage: url('https://markrossstudio.com/wp/wp-content/uploads/2014/09/MRoss_CPowersRacingB-e1410990826225.jpg'),
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
      {/* Área destacada */}
      <div className="featured" style={featuredStyle}></div>
      <div className="cards-container">
        {ciclistas.map(ciclista => (
          <Card 
            key={ciclista._id} // Asumiendo que _id es el identificador único del ciclista
            title={`${ciclista.nombre} ${ciclista.apellidos}`}
            description={`Edad: ${ciclista.edad}, Género: ${ciclista.genero}`}
            // Aquí puedes agregar más datos del ciclista si lo deseas
          />
        ))}
      </div>
    </div>
  );
};

export default Ciclistas;