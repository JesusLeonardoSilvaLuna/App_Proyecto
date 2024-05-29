import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import InscripcionForm from "./pages/inscripciones/Inscripciones";
import Eventos from './pages/eventos/Eventos'; 
import Ciclistas from './pages/ciclistas/Ciclistas'; 
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import GesNoticias from "./pages/Organizador/GestionarNoticias";
import Gestionar from "./pages/Organizador/GestionarEventos"
import GestionarIns from "./pages/Organizador/GesInscripciones"
import DetalleEvento from "./pages/eventos/DetallesEvento";
import "./app.scss";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/eventos/:id" element={<DetalleEvento />} />
        <Route path="/eventos" element={<Eventos />} /> 
        <Route path="/inscripciones" element={<InscripcionForm />} />
        <Route path="/ciclistas" element={<Ciclistas />} />
        <Route path="/organizador" element={<GesNoticias />} />
        <Route path="/gestionar" element={<Gestionar />} />
        <Route path="/gestionarIns" element={<GestionarIns />} />
        {user && (
          <Route path="/watch" element={<Watch />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;