// Импорты
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CREATED_CODE } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const { JWT_SECRET = 'very-secret-key' } = process.env;
// Запрос всех пользователей с сервера
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

// Запрос пользователя по id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError({ message: 'Такого пользователя не существует.' }))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError({
            message: 'При зпросе пользователя переданы некорректные данные',
          }),
        );
      }
      return next(err);
    });
};

// Создание нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED_CODE).send({
        _id: user._id,
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new ConflictError({
            message: 'Пользователь с таким email уже существует',
          }),
        );
      }
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError({
            message: 'При регистрации пользователя переданы некорректные данные',
          }),
        );
      }
      return next(err);
    });
};

// Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(next);
};

// Обновить данные пользователя
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError({ message: 'Такого пользователя не существует.' }))
    .then((updatedUserData) => {
      res.send(updatedUserData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError({
            message: 'При обновлении профиля переданы некорректные данные',
          }),
        );
      }
      return next(err);
    });
};

// Обновить аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError({ message: 'Такого пользователя не существует.' }))
    .then((updatedUserData) => {
      res.send(updatedUserData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError({
            message: 'При обновлении аватара переданы некорректные данные',
          }),
        );
      }
      return next(err);
    });
};

// Запрос информации о пользователе
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError({ message: 'Такого пользователя не существует.' }))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
