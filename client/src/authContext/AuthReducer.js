// Función reductora para manejar el estado de autenticación
const AuthReducer = (state, action) => {
  switch (action.type) {
    // Manejo de la acción LOGIN_START
    case "LOGIN_START":
      return {
        user: null, // No hay usuario autenticado
        isFetching: true, // Indica que se está realizando la autenticación
        error: false, // No hay error
      };
    
    // Manejo de la acción LOGIN_SUCCESS
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, // Usuario autenticado recibido en la acción
        isFetching: false, // La autenticación ha terminado
        error: false, // No hay error
      };
    
    // Manejo de la acción LOGIN_FAILURE
    case "LOGIN_FAILURE":
      return {
        user: null, // No hay usuario autenticado
        isFetching: false, // La autenticación ha terminado
        error: true, // Hubo un error en la autenticación
      };
    
    // Manejo de la acción LOGOUT
    case "LOGOUT":
      localStorage.removeItem("user"); // Remueve el usuario del localStorage
      return {
        user: null, // No hay usuario autenticado
        isFetching: false, // No se está realizando autenticación
        error: false, // No hay error
      };
    
    // Retorno por defecto, si la acción no es reconocida
    default:
      return state; // Devuelve el estado actual sin cambios
  }
};

export default AuthReducer;
