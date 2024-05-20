import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import Card from "../../components/card/Card"; // Importa el componente Card
import "./home.scss";

const Home = ({ type }) => {

  return (
    <div className="home">
      <Navbar />
      <Featured /> 
      <div className="card-container">
      <Card
        title="Nuevo Record"
        src="https://th.bing.com/th/id/OIP.8Jvx3lRnMfMKAJ1vM7nW7AHaE7?rs=1&pid=ImgDetMain"
        description="Pablo Garcia rompe record"
      />
      <Card
        title="Regreso"
        src="https://wallpaperbat.com/img/446702-cycling-wallpaper.jpg"
        description="Miguel Hernandez regresa al mundo del ciclismo"
      />
      <Card
        title="Nueva promesa"
        src="https://www.gentlemansgazette.com/wp-content/uploads/2015/06/Cycling-shorts-for-men-840x559.jpg"
        description="El novato Cristian Perez mostro un gran potencial"
      />
      </div>
    </div>
  );
};

export default Home;