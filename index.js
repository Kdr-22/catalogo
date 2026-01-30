const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const morgan = require('morgan')

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/api/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});