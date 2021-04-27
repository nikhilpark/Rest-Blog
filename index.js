const express = require("express");
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");
require("dotenv").config();
const flash = require('connect-flash');
const session = require('express-session');
const { ensureAuthenticated } = require('./config/auth');
const seedDB = require('./seed');
const passport = require('passport')

const mongoose = require("mongoose");
const localURL = "mongodb://localhost:27017/blog"

const cloudURL = "mongodb+srv://nikhilpark:Nklplp12@@blog.ngngn.mongodb.net/blog?retryWrites=true&w=majority"

require("./config/passport")(passport);

mongoose 
  .connect(
    cloudURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const app = express();

const path = require("path");

app.use(session({
  secret: 'secrett',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})




app.use("/blog",ensureAuthenticated, blogRoutes);
app.use(userRoutes);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));





// seedDB(); 




app.get("/", (req, res) => {
  res.redirect("/login")
}); 







app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");

});
