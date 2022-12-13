const { User } = require('../models');

class UserRepository {
  static async getByEmail({ email }) {
    const getUser = await User.findOne({ where: { email } });
    return getUser;
  }

  static async getByID({ id }) {
    const getUser = await User.findOne({ where: { id } });
    return getUser;
  }

  static async create({ name, email, password, role }) {
    const createdUser = await User.create({
      name,
      email,
      password,
      role,
    });
    return createdUser;
  }
}

module.exports = UserRepository;
