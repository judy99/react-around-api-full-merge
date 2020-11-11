const { celebrate, Joi } = require('celebrate');
const cards = require('express').Router();
const {
  getCards, createCard, deleteCard, unlikeCard, likeCard,
} = require('../controllers/cards.js');
const auth = require('../middlewares/auth.js');

cards.get('/cards', auth, getCards);

cards.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
  }),
}),
createCard);

cards.delete('/cards/:id', auth, deleteCard);
cards.put('/cards/likes/:id', auth, likeCard);
cards.delete('/cards/likes/:id', auth, unlikeCard);

module.exports = cards;
