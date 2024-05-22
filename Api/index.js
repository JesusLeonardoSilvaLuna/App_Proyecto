const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const cors = require("cors");

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

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.post('/api/auth/register', (req, res) => {
  // Aquí iría la lógica para registrar un usuario
  const { email, username, password } = req.body;
  // Suponiendo que la lógica de registro es exitosa
  res.status(201).send('Registro exitoso');
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});