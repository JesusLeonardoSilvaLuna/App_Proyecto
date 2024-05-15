import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import { ArrowDropDown } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageXOffset === 0 ? false : true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src=""
            alt=""
          />
          <Link to="/" className="link">
            <span>Inicio</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Eventos</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Equipos</span>
          </Link>
          <span>Inscripciones</span>
          <span>Resultados</span>
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <span></span>
          <NotificationsIcon className="icon" />
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/77c02028044361.5636ec274f9ad.jpg"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Configuración</span>
              <span onClick={() => dispatch(logout())}>Cerrar sesión</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;