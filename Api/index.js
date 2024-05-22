const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const cors = require("cors");
const PORT = process.env.PORT || 8800;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(cors({
    origin: 'https://app-proyecto.vercel.app', // URL de tu frontend en Vercel
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
  }));

app.use(express.json());

app.use("/Api/auth", authRoute);
app.use("/Api/users", userRoute);

app.post('/Api/login', (req, res) => {
  const { email, password } = req.body;
  // Aquí va la lógica de autenticación
  res.status(200).json({ message: 'Login successful' });
});

app.post('/Api/auth/register', (req, res) => {
  // Aquí iría la lógica para registrar un usuario
  const { email, username, password } = req.body;
  // Suponiendo que la lógica de registro es exitosa
  res.status(201).send('Registro exitoso');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});