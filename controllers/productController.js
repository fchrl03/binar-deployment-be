const productService = require('../services/productService');
const cloudinary = require('../config/cloudinary');

const getAll = async (req, res) => {
  const { status, status_code, message, data } = await productService.getAll();
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const { status, status_code, message, data } = await productService.getByID({ id });
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const create = async (req, res) => {
  const { name, price, stock, picture, available, user_id } = req.body;
  const { status, status_code, message, data } = await productService.create({ name, price, stock, picture, available, user_id });
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { getAll, getByID, create };
