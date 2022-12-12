const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT, ROLES } = require('../lib/const');
const SALT_ROUND = 10;

class AuthService {
  static async register({ name, email, password }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: 'Nama wajib diisi',
          data: null,
        };
      }

      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: 'Email wajib diisi',
          data: null,
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: 'Password wajib diisi',
          data: null,
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: 'Password minimal 8 karakter',
          data: null,
        };
      }

      const getUserByEmail = await userRepository.getByEmail({ email });

      if (getUserByEmail) {
        return {
          status: false,
          status_code: 400,
          message: 'Email sudah digunakan',
          data: null,
        };
      } else {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        const createdUser = await userRepository.create({
          name,
          email,
          password: hashedPassword,
          role: ROLES.MEMBER,
        });

        return {
          status: true,
          status_code: 201,
          message: 'Berhasil mendaftarkan user',
          data: createdUser,
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async login({ email, password }) {
    try {
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: 'Email wajib diisi',
          data: null,
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: 'Password wajib diisi',
          data: null,
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: 'Password minimal 8 karakter',
          data: null,
        };
      }

      const getUser = await userRepository.getByEmail({ email });

      if (!getUser.password) {
        return {
          status: false,
          status_code: 400,
          message: 'Akun ini belum melakukan setup password.',
          data: null,
        };
      }

      if (!getUser) {
        return {
          status: false,
          status_code: 404,
          message: 'Email belum terdaftar',
          data: null,
        };
      } else {
        const isPasswordMatch = await bcrypt.compare(password, getUser.password);

        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              id: getUser.id,
              email: getUser.email,
            },
            JWT.SECRET,
            {
              expiresIn: JWT.EXPIRED,
            }
          );

          return {
            status: true,
            status_code: 200,
            message: 'User berhasil login',
            data: {
              token,
            },
          };
        } else {
          return {
            status: false,
            status_code: 400,
            message: 'Password salah',
            data: null,
          };
        }
      }
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

module.exports = AuthService;
