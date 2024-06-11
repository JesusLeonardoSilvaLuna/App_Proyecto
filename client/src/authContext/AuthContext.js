import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Estado inicial de la autenticación
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Obtiene el usuario del localStorage o null si no existe
  isFetching: false, // Indicador de si se está realizando una solicitud de autenticación
  error: false, // Indicador de si hubo un error en la autenticación
};

// Creación del contexto de autenticación con el estado inicial
export const AuthContext = createContext(INITIAL_STATE);

// Proveedor del contexto de autenticación
export const AuthContextProvider = ({ children }) => {
  // Uso de useReducer para manejar el estado de autenticación
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Efecto que se ejecuta cuando cambia el estado del usuario
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); // Guarda el usuario en el localStorage
  }, [state.user]);

  return (
    // Proveedor del contexto de autenticación que envuelve a los componentes hijos
    <AuthContext.Provider
      value={{
        user: state.user, // Usuario autenticado
        isFetching: state.isFetching, // Indicador de solicitud en proceso
        error: state.error, // Indicador de error
        dispatch, // Función para despachar acciones
      }}
    >
      {children} {/* Renderiza los componentes hijos */}
    </AuthContext.Provider>
  );
};

export default AuthReducer;
