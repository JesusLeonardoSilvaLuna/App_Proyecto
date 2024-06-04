import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src="" alt="" />
          <Link to="/" className="link">
            <span>Inicio</span>
          </Link>
          <Link to="/eventos" className="link">
            <span className="navbarmainLinks">Eventos</span>
          </Link>
          <Link to="/ciclistas" className="link">
            <span className="navbarmainLinks">Ciclistas</span>
          </Link>
          <Link to="/equipos" className="link">
            <span className="navbarmainLinks">Equipos</span>
          </Link>
          <Link to="/resultados" className="link">
            <span className="navbarmainLinks">Resultados</span>
          </Link>
          <Link to="/organizador" className="link">
            <span className="navbarmainLinks">Organizador</span>
          </Link>
          <Link to="/juez" className="link">
            <span className="navbarmainLinks">Juez</span>
          </Link>
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <span>KID</span>
          <NotificationsIcon className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <ArrowDropDownIcon className="icon" />
            <div className={isMenuOpen ? "options open" : "options"}>
              <Link to="/perfil" className="link">
              <span>Ir a mi perfil</span>
              </Link>
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
