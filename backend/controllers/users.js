const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { httpStatusCode } = require('../utils/httpCodes');
const { NotFoundError } = require('../errors/not-found-err');
const { BadReqError } = require('../errors/bad-req-err');
const { AuthError } = require('../errors/auth-err');
const { defaultUser } = require('../utils/defaultUser');
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('No users found.');
      }
      return res.status(httpStatusCode.OK).send(users);
    })
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    User.findById(id)
      .then((users) => {
        if (!users) {
          throw new NotFoundError('No user with matching ID found.');
        }
        return res.status(httpStatusCode.OK).send(users);
      })
      .catch((err) => next(err));
  } catch (e) {
    throw new BadReqError('Wrong ID format.');
  }
};

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((users) => {
      if (!users) {
        throw new NotFoundError('No user info found');
      }
      return res.status(httpStatusCode.OK).send(users);
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    name = defaultUser.NAME,
    about = defaultUser.ABOUT,
    avatar = defaultUser.AVATAR,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    throw new BadReqError('Email or password should not be empty.');
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new BadReqError('User with such email exists.');
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name, about, avatar, email, password: hash,
          }))
          .then((newUser) => {
            if (!newUser) {
              throw new Error('Can\'t create user.');
            }
            return res.status(httpStatusCode.OK).send({ data: newUser });
          });
      }
    })
    .catch((err) => next(err));
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findOneAndUpdate({ _id }, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new Error('Can\'t update user profile.');
      }
      return res.status(httpStatusCode.OK).send({ data: user });
    })
    .catch((err) => next(err));
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findOneAndUpdate({ _id }, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new Error('Can\'t update user avatar.');
      }
      return res.status(httpStatusCode.OK).send({ data: user });
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      if (!user) {
        throw new AuthError('Authentication error.Can\'t find user.');
      }
      // we're creating a token
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
	console.log(process.env.NODE_ENV); // production

      res.status(httpStatusCode.OK).send({ token });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
