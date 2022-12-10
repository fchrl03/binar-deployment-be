const { Product } = require('./models');

Product.create({
  name: 'Apple',
  price: 5000,
  stock: 10,
  picture: 'https://www.gardeningknowhow.com/wp-content/uploads/2021/07/red-apple-fruit.jpg',
  available: true,
  user_id: 1,
}).then((product) => {
  console.log(product);
});
