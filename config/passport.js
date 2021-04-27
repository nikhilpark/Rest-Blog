const LocalStrategy = require ('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require ('bcrypt-nodejs');

const User = require("../models/userData");
module.exports = function (passport) {
passport.use(

    new LocalStrategy( {usernameField: 'email',passwordField: 'password'}, (email,password,done)=>{
        //Match user
        User.findOne({email:email})
        .then(user => {
            if(!user){
                return done(null, false, {message: "Email not registered"});
            }
             bcrypt.compare(password,user.password, (err, isMatch)=>{
                if(err) throw err;

                if(isMatch) { 
                    return done(null, user);
                } else{
                    return done(null, false, {message: "Password incorrect"});
                }
             })
        })
        .catch( err => console.log(err))
    })

);
    passport.serializeUser((user, done) =>  {
    done(null, user.id);
      });
  
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });  
      });
}