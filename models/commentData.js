const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    blogID:String ,
    userID:String, 
    username:String,
    email:String,
    body:String,
    date:{
      type: Date,
      default: Date.now
    },
    
  
   
  });

  module.exports = mongoose.model('Comment',commentSchema) 