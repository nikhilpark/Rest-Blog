const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    body:String,
    user:String,
    email:String,
  });

  module.exports = mongoose.model('Comment',commentSchema) 