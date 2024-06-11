import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import './menu.scss';

const Menu = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    console.log("Dispatching logout");
    dispatch(logout());
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src="" alt="" />
          <Link to="/organizador" className="link">
            <span>Noticias</span>
          </Link>
          <Link to="/gestionar" className="link">
            <span className="navbarmainLinks">Eventos</span>
          </Link>
          <Link to="/gestionarIns" className="link">
            <span className="navbarmainLinks">Inscripciones</span>
          </Link>
          <Link to="/informacion" className="link">
            <span className="navbarmainLinks">Infromacion</span>
          </Link>
          <Link to="/seguimiento" className="link">
            <span className="navbarmainLinks">Seguimiento</span>
          </Link>
          <Link to="/" className="link">
            <span className="navbarmainLinks">Inicio</span>
          </Link>
          <Link to="/juez" className="link">
            <span className="navbarmainLinks">Juez</span>
          </Link>
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <span>Angie</span>
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
              <span onClick={handleLogout}>Cerrar sesión</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;