import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://app-proyecto-api.vercel.app/api/auth/login", user);
    console.log("Inicio de sesión exitoso:", res.data); // Mensaje de éxito
    dispatch(loginSuccess(res.data));
    return res.data; // Devolver los datos del usuario
  } catch (err) {
    console.error("Error al iniciar sesión:", err); // Mensaje de error
    dispatch(loginFailure());
    throw err; // Lanzar el error para que sea manejado por el componente Login
  }
};

export const loginWithGoogle = async (tokenId, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://app-proyecto-api.vercel.app/api/auth/google/callback", { tokenId });
    console.log("Inicio de sesión exitoso con Google:", res.data);
    dispatch(loginSuccess(res.data));
    return res.data; // Devolver los datos del usuario
  } catch (err) {
    console.error("Error al iniciar sesión con Google:", err);
    dispatch(loginFailure());
    throw err; // Lanzar el error para que sea manejado por el componente Login
  }
};