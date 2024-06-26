const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("Token recibido:", token);
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token no válido o caducado");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("Token de autorización no encontrado");
  }
};

module.exports = verify;
