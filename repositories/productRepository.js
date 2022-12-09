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
}

module.exports = ProductRepository;
