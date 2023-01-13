const express = require('express');
const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

const { authorizationValidator, registrationValidator } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

// Не защищенные маршруты
router.post('/signup', registrationValidator, createUser);
router.post('/signin', authorizationValidator, login);
// Защищенные маршруты
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.all('*', express.json(), (req, res, next) => {
  next(new NotFoundError({ message: 'Запрашиваемая страница не найдена' }));
});

module.exports = router;
