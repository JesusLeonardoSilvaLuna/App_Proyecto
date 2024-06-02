import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import Card from "../../components/card/Card";
import axios from 'axios'; 
import "./home.scss";

const Home = ({ type }) => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get('https://app-proyecto-api.vercel.app/api/news/obtener'); 
        setNoticias(response.data);
      } catch (error) {
        console.error('Error al obtener noticias:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error al cargar noticias</div>;
  }

  return (
    <div className="home">
      <Navbar />
      <Featured /> 
      <div className="card-container">
        {/* Verifica si noticias es un arreglo antes de mapear */}
        {Array.isArray(noticias) && noticias.length > 0 ? (
          noticias.map((noticia, index) => (
            <Card
              key={index}
              title={noticia.title}
              src={noticia.image}
              description={noticia.content}
            />
          ))
        ) : (
          <div>No hay noticias disponibles</div>
        )}
      </div>
    </div>
  );
};

export default Home;