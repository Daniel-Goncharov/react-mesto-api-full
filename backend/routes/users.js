const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users'); // импортируем контроллеры из users

const {
  userValidator,
  userIdValidator,
  avatarValidator,
} = require('../middlewares/validation'); // импортируем валидаторы

router.get('/', getUsers); // получить всех пользователей
router.get('/me', getUserInfo); // Получение информации о пользователе
router.get('/:userId', userIdValidator, getUserById); // получить конкретного пользователя по id
router.patch('/me', userValidator, updateProfile); // обновить данные пользователя
router.patch('/me/avatar', avatarValidator, updateAvatar); // обновить аватар пользователя

module.exports = router;
