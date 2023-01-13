const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле `Название` не должно быть короче 2 символов'],
    maxlength: [30, 'Поле `Название` не должно быть длиннее 30 символов'],
    required: [true, 'Заполните поле `Название`'],
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/.test(link);
      },
      message: (props) => `${props.value} вы указали некорретный URL`,
    },
    required: [true, 'Заполните поле `Ссылка`'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: [true, 'Не получены данные об авторе карточки'],
  },
  likes: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
