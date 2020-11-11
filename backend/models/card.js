const mongoose = require('mongoose');
const linkValidator = require('../utils/linkValidator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => linkValidator(link),
      message: (props) => `${props.value} is not a valid link. `,
    },
  },

  owner: {
    type: 'ObjectId',
    required: true,
  },
  likes: [{
    type: 'ObjectId',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
