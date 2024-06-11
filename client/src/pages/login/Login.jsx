import { useState, useContext, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
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
  const [isNewUser, setIsNewUser] = useState(false);

  /**
   * Verifica si el usuario es nuevo al cargar el componente
   */
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsNewUser(!userId);
  }, []);

  /**
   * Maneja la respuesta de Google OAuth
   * @param {Object} response - La respuesta de Google OAuth
   */
  const responseGoogle = async (response) => {
    try {
      if (response.credential) {
        setError(null);
        await loginWithGoogle(response.credential, dispatch);
        navigate('/');
      } else {
        setError("Error al iniciar sesión con Google. Por favor, inténtelo de nuevo.");
      }
    } catch (err) {
      setError("Error al iniciar sesión con Google. Por favor, inténtelo de nuevo.");
      console.error("Error al iniciar sesión con Google:", err);
    }
  };

  /**
   * Maneja el inicio de sesión
   * @param {Object} e - El evento del formulario
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      console.log("Iniciando sesión...");
      const userData = await login({ email, password }, dispatch);
      console.log("Datos del usuario:", userData);
      if (!userData) {
        console.error("Datos del usuario no disponibles.");
        return;
      }
      console.log("Rol del usuario:", userData.role);
      if (userData.role === "Ciclista") {
        console.log("Redirigiendo a la página de inicio para ciclistas...");
        navigate('/');
      } else if (userData.role === "Organizador") {
        console.log("Redirigiendo a la página de inicio para organizadores...");
        navigate('/organizador');
      }
      localStorage.setItem('userId', userData._id);
      localStorage.setItem('accessToken', userData.accessToken);
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, verifique sus credenciales e inténtelo de nuevo.");
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <GoogleOAuthProvider clientId="817589480367-cu9l2a8dbqfm78gla3ttf8540cnlmh0e.apps.googleusercontent.com">
      <div className="login">
        <div className="top">
          <div className="wrapper">
            <h1>ByCicling</h1>
          </div>
        </div>
        <div className="container">
          <form>
            <h1>Iniciar Sesión</h1>
            {isNewUser ? (
              <Link to="/completar">
                <button className="loginButton">
                  Completar registro
                </button>
              </Link>
            ) : (
              <>
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={() => {
                    setError("Error al iniciar sesión con Google. Por favor, inténtelo de nuevo.");
                  }}
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
              </>
            )}
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;

