import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import Card from "../../components/card/Card";
import axios from 'axios'; 
import "./home.scss";

const Home = ({ type }) => {
  const [noticias, setNoticias] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get('https://app-proyecto-api.vercel.app/api/news/obtener'); 
        setNoticias(response.data);
      } catch (error) {
        console.error('Error al obtener noticias:', error);
      }
    };

    fetchNoticias();
  }, []);

  const startAutoSlide = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (prevIndex === noticias.length) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 6000);
  }, [noticias.length]);

  const stopAutoSlide = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (noticias.length > 0) {
      startAutoSlide();
    }

    return () => stopAutoSlide();
  }, [noticias, startAutoSlide, stopAutoSlide]);

  const goToPrevious = () => {
    stopAutoSlide();
    setCurrentIndex(prevIndex => {
      if (prevIndex === 0) {
        return noticias.length - 1;
      }
      return prevIndex - 1;
    });
    startAutoSlide();
  };

  const goToNext = () => {
    stopAutoSlide();
    setCurrentIndex(prevIndex => (prevIndex + 1) % noticias.length);
    startAutoSlide();
  };

  return (
    <div className="home">
      <Navbar />
      <Featured /> 
      <div className="card-container">
        <button className="arrow arrow-left" onClick={goToPrevious}>&#8249;</button>
        <div className="cards" style={{ transform:` translateX(-${currentIndex * (100 / noticias.length)}%)` }}>
          {noticias.concat(noticias).map((noticia, index) => (
            <Card
              key={index}
              title={noticia.title}
              src={noticia.image}
              description={noticia.content}
            />
          ))}
        </div>
        <button className="arrow arrow-right" onClick={goToNext}>&#8250;</button>
      </div>
    </div>
  );
};

export default Home;