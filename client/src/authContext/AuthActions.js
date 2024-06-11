// Acción que indica el inicio del proceso de autenticación
export const loginStart = () => ({
  type: "LOGIN_START", // Tipo de acción para iniciar sesión
});

// Acción que se despacha cuando la autenticación es exitosa
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS", // Tipo de acción para éxito en la autenticación
  payload: user, // Información del usuario autenticado
});

// Acción que se despacha cuando la autenticación falla
export const loginFailure = () => ({
  type: "LOGIN_FAILURE", // Tipo de acción para fallo en la autenticación
});

// Acción que indica que el usuario ha cerrado sesión
export const logout = () => ({
  type: "LOGOUT", // Tipo de acción para cerrar sesión
});