const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Поле `Имя` не должно быть короче 2 символов'],
      maxlength: [30, 'Поле `Имя` не должно быть длиннее 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Поле `О себе` не должно быть короче 2 символов'],
      maxlength: [30, 'Поле `О себе` не должно быть длиннее 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator(link) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/.test(link);
        },
        message: (props) => `${props.value} вы указали некорретный URL`,
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: [true, 'Укажите адрес электронной почты'],
      unique: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: (props) => `${props.value} вы указали некорретный адрес электронной почты`,
      },
    },
    password: {
      type: String,
      required: [true, 'Не введен пароль'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError({ message: 'Указан неверный email или пароль' });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError({ message: 'Указан неверный email или пароль' });
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
