import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
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
          <Link to="/eventos" className="link">
            <span className="navbarmainLinks">Eventos</span>
          </Link>
          <Link to="/inscripciones" className="link">
            <span className="navbarmainLinks">Inscripciones</span>
          </Link>
          <span></span>
          <Link to="/ciclistas" className="link">
          <span>Ciclistas</span>
          </Link>
          <span>Equipos</span>
          <span>Seguimiento</span>
          <span>Resultados</span>
        </div>
        <div className="buttons">
          <button className="more">
            <InfoOutlinedIcon />
            <span>Acerca de nosotros</span>
          </button>
        </div>
        <div className="right" >
          <SearchIcon className="icon" />
          <span>KID</span>
          <NotificationsIcon className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span>Iniciar Sesion</span>
              <span onClick={() => dispatch(logout())}>Registrate</span>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Navbar;

