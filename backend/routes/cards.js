const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards'); // импортируем контроллеры из cards

const {
  cardValidator,
  cardIdValidator,
} = require('../middlewares/validation'); // импортируем валидаторы

router.get('/', getCards); // получить все карточки
router.post('/', cardValidator, createCard); // создать новую карточку
router.delete('/:cardId', cardIdValidator, deleteCard); // удалить карточку по id
router.put('/:cardId/likes', cardIdValidator, likeCard); // поставить лайк карточке
router.delete('/:cardId/likes', cardIdValidator, dislikeCard); // убрать лайк с карточки

module.exports = router;
