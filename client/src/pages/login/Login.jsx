import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://img.ws.mms.shopee.ph/bada96bed5f7e9afa024ddc15eafaf1c"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Inicio de sesión</h1>
          <input
            type="email"
            placeholder="Correo electrónico"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Iniciar sesión
          </button>
          <span>
            No tiene una cuenta? <b>Registrate ahora.</b>
          </span>
          <small>
             <b>Acerca de</b>.
          </small>
        </form>
      </div>
    </div>
  );
}