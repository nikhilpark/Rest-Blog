const express = require("express");
let blogRouter  = express.Router();
const Blog = require('../models/blogData')
const Comment = require('../models/commentData')
const methodOverride = require("method-override"); 
const { ensureAdmin} = require('../config/admin');


blogRouter.use(methodOverride("_method"));
blogRouter.use(express.urlencoded({ extended: true }));


blogRouter.route("/")
.get(async(req, res) => { 
 
    const data = await Blog.find({});
    res.render("blog/index",{data,name:req.user.name,isAdmin:req.user.isAdmin})
  
}); 

blogRouter.use("/new",ensureAdmin)

blogRouter.route("/new")
  .get((req, res) => {
    res.render("blog/new",{name:req.user.name,isAdmin:req.user.isAdmin});
  })

  .post(async(req,res)=>{
    const blog = req.body;
    try{
    await Blog.create(blog);
    }
    catch(err){
      console.log( err);
    }
    res.redirect("/blog")
  });
  



blogRouter.route("/:id")
.get( (req, res) => {
  const { id } = req.params;

  Blog.findOne({ _id: id }, async function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      const comments = await Comment.find({})
      res.render("blog/show",  {comment: comments, data: docs, name:req.user.name,isAdmin:req.user.isAdmin });
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
  })
  .put(async(req,res)=>{

    const body = req.body.comment;
    const user = req.user.name
    const email = req.user.email
  
    try{
    await  Comment.create({
      body: body,
      user: user,
      email: email,

    });
    }
    catch(err){
      console.log( err);
    }
    res.redirect("/blog")
  });


blogRouter.use("/:id/edit",ensureAdmin)

blogRouter.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  Blog.findById(id, function (err, docs) { 
    if (err) {
      console.log("error");
    } else {
      console.log("yo");
      res.render("blog/edit", { data: docs, name:req.user.name,isAdmin:req.user.isAdmin });
    }
  });
});


module.exports = blogRouter;

