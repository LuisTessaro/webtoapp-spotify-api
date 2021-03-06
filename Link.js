const mongoose = require('mongoose')

module.exports = mongoose.model('Link', {
  url: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
  },
  authorUrl: {
    type: String,
  },
  author: {
    type: String,
  },
})
