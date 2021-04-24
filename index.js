const express = require("express");
const blogRoutes = require("./routes/blog")
const userRoutes = require("./routes/user")
require("dotenv").config();
const seedDB = require('./seed');
const mongoose = require("mongoose");
const localURL = "mongodb://localhost:27017/blog"

const cloudURL = "mongodb+srv://nikhilpark:Nklplp12@@blog.ngngn.mongodb.net/blog?retryWrites=true&w=majority"

mongoose 
  .connect(
    localURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));


const app = express();

const path = require("path");
app.use("/blog",blogRoutes);
app.use(userRoutes);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
//seedDB();



app.get("/", (req, res) => {
  res.send("<a href='/blog'>Here </a>");
});




app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");

});
