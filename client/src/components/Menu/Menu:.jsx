import React from 'react';
import { Link } from 'react-router-dom';
import './menu.scss';

const MainMenu = () => {
  return (
    <nav className="main-menu">
      <ul className="menu-list">
        <li className="menu-item"><Link to="/" className="menu-link">Inicio</Link></li>
        <li className="menu-item"><Link to="/organizador" className="menu-link">Noticias</Link></li>
        <li className="menu-item"><Link to="/gestionar" className="menu-link">Eventos</Link></li>
        <li className="menu-item"><Link to="/gestionarIns" className="menu-link">Inscripciones</Link></li>
        <li className="menu-item"><Link to="/informacion" className="menu-link">Información</Link></li>
        <li className="menu-item"><Link to="/seguimiento" className="menu-link">Seguimiento en Tiempo Real</Link></li>
      </ul>
    </nav>
  );
}

export default MainMenu;