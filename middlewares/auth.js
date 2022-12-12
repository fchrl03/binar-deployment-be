const jwt = require('jsonwebtoken');
const { JWT, ROLES } = require('../lib/const');
const userRepository = require('../repositories/userRepository');

const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  let token = '';

  if (authHeader && authHeader.startsWith('Bearer')) token = authHeader.split(' ')[1];
  else
    return res.status(401).send({
      status: false,
      message: 'Anda harus login untuk mengakses resource ini.',
      data: null,
    });

  try {
    const { email } = jwt.verify(token, JWT.SECRET);

    const getUser = await userRepository.getByEmail({ email });

    req.user = getUser;

    next();

    return;
  } catch (err) {
    return res.status(401).send({
      status: false,
      message: 'Sesi telah kadaluarsa. Silakan login kembali',
      data: null,
    });
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role === ROLES.ADMIN) return next();
  return res.status(401).send({
    status: false,
    message: 'Akun anda harus admin untuk mengakses resource ini.',
    data: null,
  });
};

module.exports = { authenticate, isAdmin };
