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
      const comments = await Comment.find({blogID: req.params.id})
      // const today = new Date();
      // for (const c in comments){
      //   console.log(c)
      // // let storedSecond  = c.date.getSeconds()
      // // let storedMinutes = c.date.getMinutes()
      // // let storedHours = c.date.getHours()

      // }
      // console.log(comments)
      
      // console.log(storedSecond)
      // console.log(storedMinutes)
      // console.log(storedHours)

      // let nowSecond = today.getSeconds()
      // let nowMinutes = today.getMinutes()
      // let nowHours = today.getHours()

      // console.log(nowSecond)
      // console.log(nowMinutes)
      // console.log(nowHours)
      

      
      res.render("blog/show",  {comment: comments, data: docs,userID:req.user._id, name:req.user.name,isAdmin:req.user.isAdmin });
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
    const blogID = req.params.id
    const userID = req.user._id
    const username = req.user.name
    const email = req.user.email
    const body = req.body.comment;

    try{
    await  Comment.create({
      blogID: blogID,
      userID: userID,
      username: username,
      email: email,
      body: body,

    });
    }
    catch(err){
      console.log( err);
    }
    res.redirect("/blog"+"/"+ req.params.id) 
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

blogRouter.delete("/comment/:id/",(req,res)=>{
  console.log("worked")
  const commID = req.body.commID;
  console.log(commID)
  Comment.findByIdAndDelete(commID , function (err) {
    if (err) {
      console.log(err);
    } else {

      res.redirect("/blog/"+ req.params.id);
    }
  });  
})



module.exports = blogRouter;

