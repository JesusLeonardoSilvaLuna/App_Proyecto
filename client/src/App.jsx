import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Log from "./pages/login/Login";
import InscripcionForm from "./pages/inscripciones/Inscripciones";
import Eventos from './pages/eventos/Eventos';
import Equipos from './pages/equipos/Equipo';  
import Ciclistas from './pages/ciclistas/Ciclistas'; 
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import GesNoticias from "./pages/Organizador/GestionarNoticias";
import Gestionar from "./pages/Organizador/GestionarEventos";
import GestionarIns from "./pages/Organizador/GesInscripciones";
import Perfil from './pages/perfil/Perfil'; 
import Resultados from './pages/resultados /Resultados'; 

import "./app.scss";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/log" element={<Log />} /> 
        <Route path="/eventos" element={<Eventos />} /> 
        <Route path="/equipos" element={<Equipos />} /> 

        {user ? (
          user.role === 'Ciclista' ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/perfil" element={<Perfil />} /> 
              <Route path="/watch" element={<Watch />} />
              <Route path="/log" element={<Log />} /> 
              <Route path="/eventos" element={<Eventos />} /> 
              <Route path="/equipos" element={<Equipos />} /> 
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/organizador" />} />
              <Route path="/organizador" element={<GesNoticias />} />
              <Route path="/inscripciones" element={<InscripcionForm />} />
              <Route path="/ciclistas" element={<Ciclistas />} />
              <Route path="/gestionar" element={<Gestionar />} />
              <Route path="/gestionarIns" element={<GestionarIns />} />
            </>
          )
        ) : (
          <Navigate to="/login" />
        )}
      </Routes>
    </Router>
  );
};

export default App;