const express = require("express");
let userRouter  = express.Router();
const User = require('../models/userData');
const bcrypt = require ('bcrypt-nodejs')
const passport = require('passport')

userRouter.use(express.urlencoded({ extended: true }));


userRouter.route("/signup")
.get( (req, res) => {
    res.render("user/signup");
  })
.post( (req,res) => {
  const { name, email, password, password2 } =  req.body; 
  let errors = [];

  if (!name || !email || !password || !password2  ){
    errors.push({msg: 'Please fill in all fields'})
  }

  if (password !== password2){
    errors.push({msg:"Passwords do not match"})
  }

  if(password.length<6){
    errors.push({msg:"Password should be atleast be 6 characters"})
  }

  if(errors.length>0){
    res.render('user/signup',{
      errors,
      name,
      email,
      password,
      password2
    })
  }else{
    User.findOne ({email: email})
    .then(user => {
      if(user){
        errors.push ({msg: 'Email is already regitered'})
        res.render('user/signup',{
          errors,
          name,
          email,
          password,
          password2     
        });
      } else{
        const newUser = new User({
          name,
          email,
          password
        });
        // console.log(newUser)
        // res.send("created")
        bcrypt.genSalt(10, (err,salt)=>
        bcrypt.hash(newUser.password,salt,null, (err,hash)=>{
          if(err) throw err;
          newUser.password = hash; 

          newUser.save()
            .then(user=>{
              req.flash('success_msg','You are now registred and can now login');
              res.redirect('/login')
            })
            .catch(err=>console.log(err))
        }))
      }
    }); 
  }

});


  userRouter.route("/login")
  .get( (req, res) => {
      res.render("user/login");
    })
  .post( (req, res, next) => {
       passport.authenticate('local',{
         successRedirect: '/blog',
         failureRedirect: '/login',
         failureFlash: true
       }) (req,res,next);
        });
        
  
  userRouter.route("/logout")
  .get( (req,res)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/login')
  });
      

module.exports = userRouter;