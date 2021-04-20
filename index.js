const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection succesful"))
  .catch((err) => console.log(err));

const app = express();
const methodOverride = require("method-override");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  author: String,
  content: String,
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/", (req, res) => {
  res.send("<a href='/blog'>Here </a>");
});

app.get("/hey", (req, res) => {
  res.send("hey");
});

app.get("/blog", (req, res) => {
  Blog.find(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.render("blog/index", { data: docs });
    }
  });
});

app.get("/blog/new", (req, res) => {
  res.render("blog/new");
});

app.get("/blog/:id", (req, res) => {
  const { id } = req.params;

  Blog.findOne({ _id: id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.render("blog/show", { data: docs });
    }
  });

  // res.render("blog/show", { blogs: foundBlog });
});

app.post("/blog/new", (req, res) => {
  console.log(req.body);

  const blogData = {
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    content: req.body.content,
  };
  let data = Blog(blogData);

  data
    .save()
    .then((m) => {
      console.log(m);
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blog/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  Blog.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blog");
    }
  });
});

app.get("/blog/:id/edit", (req, res) => {
  const { id } = req.params;
  Blog.findById(id, function (err, docs) {
    if (err) {
      console.log("error");
    } else {
      console.log("yo");
      res.render("blog/edit", { data: docs });
    }
  });
});

app.patch("/blog/:id/", (req, res) => {
  const { id } = req.params;
  const upDatedBlog = req.body;
  Blog.findByIdAndUpdate(
    id,
    {
      title: upDatedBlog.title,
      image: upDatedBlog.image,
      author: upDatedBlog.author,
      content: upDatedBlog.content,
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
        res.redirect("/blog");
      }
    }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running at port 3000");
  console.log("go to localhost:3000/blog");
});
