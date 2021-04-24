const express = require("express");
let blogRouter  = express.Router();
const Blog = require('../models/blogData')
const methodOverride = require("method-override"); 
 

blogRouter.use(methodOverride("_method"));
blogRouter.use(express.urlencoded({ extended: true }));


blogRouter.route("/")
.get(async(req, res) => {
 
    const data = await Blog.find({});
    res.render("blog/index",{data})
  // Blog.find(function (err, docs) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("blog/index", { data: docs });
  //   }
  // });
  
}); 


blogRouter.route("/new")
  .get((req, res) => {
    res.render("blog/new");
  })

  .post(async(req,res)=>{
    const blog = req.body;
    try{
    await Blog.create(blog);
    }
    catch{
      console.log("error has occured");
    }
    res.redirect("/blog")
  });
  // .post((req, res) => {
  //   console.log(req.body); 

  //   const blogData = {
  //     title: req.body.title,
  //     image: req.body.image,
  //     author: req.body.author,
  //     content: req.body.content,
  //   }; 
  //   let data = Blog(blogData);

  //   data
  //     .save()
  //     .then((m) => {
  //       console.log(m);
  //       res.redirect("/blog");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
blogRouter.route("/:id")
.get( (req, res) => {
  const { id } = req.params;

  Blog.findOne({ _id: id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.render("blog/show", { data: docs });
    }
  });
})
.delete( (req, res) => {
  const { id } = req.params;
  console.log(id);

  Blog.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blog");
    }
  });
})
.patch( (req, res) => {
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

blogRouter.get("/:id/edit", (req, res) => {
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


module.exports = blogRouter;

