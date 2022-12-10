const productRepository = require('../repositories/productRepository');

class ProductService {
  static async getAll() {
    try {
      const getProduct = await productRepository.getAll();
      return {
        status: true,
        status_code: 200,
        message: 'Get All Car',
        data: getProduct,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async getByID({ id }) {
    try {
      const getProduct = await productRepository.getByID({ id });
      return {
        status: true,
        status_code: 200,
        message: 'Get All Car',
        data: getProduct,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async create({ name, price, stock, picture, available, user_id }) {
    try {
      const createProduct = await productRepository.create({ name, price, stock, picture, available, user_id });
      return {
        status: true,
        status_code: 200,
        message: 'Get All Car',
        data: createProduct,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }
}

module.exports = ProductService;
