const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./routes/products");
const bundleRoutes = require("./routes/bundle");
const morgan = require("morgan");

const app = express();

// Middlewares de seguridad y logs
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);
// MIddlewares de parsing
app.use(express.json());
app.use(morgan("dev"));
// Servir Front
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use("/api/products", productRoutes);
app.use("/api/bundle", bundleRoutes);

module.exports = app;
