const express = require('express');

const path = require('path');
const productRoutes = require('./routes/products');
const morgan = require('morgan');

const app = express();

// Middlewares globales

app.use(express.json());
app.use(morgan('dev'));
// Servir Front 

app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api/products', productRoutes);

module.exports = app;