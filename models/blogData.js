const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    author: String,
    content: String,
  });

  module.exports = mongoose.model('Blog',blogSchema) 