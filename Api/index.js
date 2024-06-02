const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const cors = require("cors");
const categoriasRoute = require("./routes/categorias");
const ciclistaRoute = require("./routes/ciclista");
const eventoRoute = require("./routes/eventos");
const juezRoute = require("./routes/juez");
const organizadorRoute = require("./routes/organizador");
const rutaRoute = require("./routes/rutas");
const noticiasRouter = require('./routes/noticias');
const inscripcionesRouter = require('./routes/inscripciones')



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
app.use("/api/categorias", categoriasRoute);
app.use("/api/ciclista", ciclistaRoute);
app.use("/api/eventos", eventoRoute);
app.use("/api/juez", juezRoute);
app.use("/api/organizador", organizadorRoute);
app.use("/api/rutas", rutaRoute);
app.use("/api/news", noticiasRouter);
app.use("/api/inscripciones", inscripcionesRouter);
app.use("/uploads", express.static('uploads'));

app.listen("https://app-proyecto-api.vercel.app/", () => {
  console.log(`Server is running`);
});
