import { useState, useContext } from "react";

import { login, loginWithGoogle } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { useNavigate, Link } from "react-router-dom"; 
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const responseGoogle = async (response) => {
    try {
      if (response.tokenId) {
        setError(null);
        await loginWithGoogle(response.tokenId, dispatch);
        navigate('/');
      } else {
        setError("Error al iniciar sesión con Google. Por favor, inténtelo de nuevo.");
      }
    } catch (err) {
      setError("Error al iniciar sesión con Google. Por favor, inténtelo de nuevo.");
      console.error("Error al iniciar sesión con Google:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      console.log("Iniciando sesión...");
      const userData = await login({ email, password }, dispatch);
      console.log("Datos del usuario:", userData); // Imprime los datos del usuario en la consola
      // Verificar el rol del usuario y redireccionar según corresponda
      if (!userData) {
        console.error("Datos del usuario no disponibles.");
        return;
      }
      console.log("Rol del usuario:", userData.role);
      if (userData.role === "Ciclista") {
        console.log("Redirigiendo a la página de inicio para ciclistas...");
        navigate('/'); // Redireccionar a la página de inicio para ciclistas
      } else if (userData.role === "Organizador") {
        console.log("Redirigiendo a la página de inicio para organizadores...");
        navigate('/organizador'); // Redireccionar a la página de inicio para organizadores
      }
  
      // Almacenar el userId en localStorage
      localStorage.setItem('userId', userData.userId);
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, verifique sus credenciales e inténtelo de nuevo.");
      console.error("Error al iniciar sesión:", err);
    }
  };
  
  
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <h1>ByCicling</h1>
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Iniciar Sesión</h1>
          <GoogleLogin
            clientId="817589480367-cu9l2a8dbqfm78gla3ttf8540cnlmh0e.apps.googleusercontent.com"
            buttonText="Iniciar sesión con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Iniciar sesión
          </button>
          {error && <p className="errorMessage">{error}</p>}
          <span>
            No tienes una cuenta? <b><Link to="/register">Regístrate ahora.</Link></b>
          </span>
          <small>
            <b>Acerca de</b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;