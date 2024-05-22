import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom"; 
import axios from "axios";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("https://app-proyecto.vercel.app/Api/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log("Login successful:", res.data);
      // Redirigir al usuario a la página deseada después del login exitoso
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        console.error("Error en la solicitud:", err.response.data);
      } else if (err.request) {
        console.error("No se recibió respuesta del servidor:", err.request);
      } else {
        console.error("Error al configurar la solicitud:", err.message);
      }
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
          <h1>Registro</h1>
          <input
            placeholder="Nombre usuario"
            name="username"
            ref={usernameRef}
          />
          <input
            type="email"
            placeholder="Correo electronico"
            name="email"
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            ref={passwordRef}
          />
          <button className="loginButton" onClick={handleFinish}>
            Registrarme 
          </button>
          <span>
            <b>Ya tengo una cuenta</b>
          </span>
          <small>
            <a>Acerca de</a>.
          </small>
        </form>
      </div>
    </div>
  );
}