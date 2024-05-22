import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://app-proyecto-api.vercel.app/api/auth/login", user);
    console.log("Inicio de sesión exitoso:", res.data); // Mensaje de éxito
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.error("Error al iniciar sesión:", err); // Mensaje de error
    dispatch(loginFailure());
  }
};