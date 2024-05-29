import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import Card from "../../components/card/Card";
import axios from 'axios'; 
import "./home.scss";

const Home = ({ type }) => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get('https://app-proyecto.vercel.app/api/news/obtener'); 
        setNoticias(response.data);
      } catch (error) {
        console.error('Error al obtener noticias:', error);
      }
    };

    fetchNoticias();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <Featured /> 
      <div className="card-container">
        {/* Mapea sobre las noticias para renderizar cada una */}
        {noticias.map((noticia, index) => (
          <Card
            key={index}
            title={noticia.title}
            src={noticia.image}
            description={noticia.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;