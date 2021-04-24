const express = require("express");
let userRouter  = express.Router();
const User = require('../models/userData');

userRouter.use(express.urlencoded({ extended: true }));
let passOk = true
let userOk = true


userRouter.route("/signup")
.get( (req, res) => {
    res.render("user/signup",{passOk, userOk});
  })
.post( async (req, res) => {
    if (req.body.password == req.body.confPass){

        const UserData = req.body;
        try{
        await User.create(UserData);
        res.redirect("/login");
        }
        catch{
          console.log("error")
          userOk = false;
          res.render("user/signup",{passOk, userOk})
        }
        
 
    }else{
        passOk = false;
        res.render("user/signup",{passOk, userOk})
        
    }
    
  });

  userRouter.route("/login")
  .get( (req, res) => {
      res.render("user/login");
    })
  .post( (req, res) => {
        console.log("this workss")
      });

module.exports = userRouter;