const express = require('express');
var cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));

// Import Controllers
const productController = require('./controllers/productController');

// Products
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getByID);
app.post('/products', productController.create);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running in port http://localhost:${process.env.PORT || 8000}`);
});
