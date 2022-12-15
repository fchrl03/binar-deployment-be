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

const create = (req, res) => {
  const fileToUpload = req.file;
  const { name, price, stock } = req.body;
  const user_id = req.user.id;

  const fileBase64 = fileToUpload.buffer.toString('base64');
  const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;
  cloudinary.uploader.upload(file, async (err, result) => {
    if (err) {
      res.status(400).send(`Gagal mengupload file ke cloudinary: ${err.message}`);

      return;
    }
    const { status, status_code, message, data } = await productService.create({
      name,
      price,
      stock,
      picture: result.url,
      user_id,
    });

    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    });
  });
};

module.exports = { getAll, getByID, create };
