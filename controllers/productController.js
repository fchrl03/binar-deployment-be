const productService = require('../services/productService');

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

module.exports = { getAll, getByID };
