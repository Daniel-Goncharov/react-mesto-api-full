// Импорты
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// Запрос всех карточек с сервера
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

// Создать карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError({
            message: 'Для создания карточки переданы некорректные данные',
          }),
        );
      }
      return next(err);
    });
};

// Удалить карточку
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError({ message: 'Карточки с указанным _id не обнаружено.' }))
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError({ message: 'Отказ. Вы не автор карточки' }));
      }
      return Card.findByIdAndRemove(req.params.cardId).then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError({
            message: 'Передан неверный _id карточки',
          }),
        );
      }
      return next(err);
    });
};

// Добавить лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError({ message: 'Карточки с указанным _id не обнаружено.' }))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError({
            message: 'Передан неверный _id карточки',
          }),
        );
      }
      return next(err);
    });
};

// Отменить лайк
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError({ message: 'Карточки с указанным _id не обнаружено.' }))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError({
            message: 'Передан неверный _id карточки',
          }),
        );
      }
      return next(err);
    });
};
