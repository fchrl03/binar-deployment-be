const { Product } = require('../models');

class ProductRepository {
  static async getAll() {
    const getProduct = await Product.findAll();
    return getProduct;
  }

  static async getByID({ id }) {
    const getProduct = await Product.findOne({ where: { id } });
    return getProduct;
  }

  static async create({ name, price, stock, picture, available, user_id }) {
    const createProduct = await Product.create({ name, price, stock, picture, available, user_id });
    return createProduct;
  }
}

module.exports = ProductRepository;
