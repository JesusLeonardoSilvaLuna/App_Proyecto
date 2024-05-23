import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import InscripcionForm from "./pages/inscripciones/Inscripciones";
import Eventos from './pages/eventos/Eventos'; 
import Ciclistas from './pages/ciclistas/Ciclistas'; 
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import "./app.scss";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/" element={user ? <Home /> : <Redirect to="/login" />} />
        <Route path="/register" element={!user ? <Register /> : <Redirect to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Redirect to="/" />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/inscripciones" element={<InscripcionForm />} />
        <Route path="/ciclistas" element={<Ciclistas />} />
        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;