const express = require("express");
let adminRouter  = express.Router();
// const Blog = require('../models/blogData')
const User = require('../models/userData');
// const Comment = require('../models/commentData')
const methodOverride = require("method-override"); 
const { ensureAdmin} = require('../config/admin');

adminRouter.use(methodOverride("_method"));
adminRouter.use(express.urlencoded({ extended: true }));

adminRouter.route("/")
.get(async(req, res) => { 
 
   const users = await User.find({});
   res.render("admin/index",{users})

  
})
.patch((req,res)=>{
    const id = req.body.userID;
    User.findByIdAndUpdate(
        id,
        {
            isAdmin:true
        },
        function(err,docs){
            if(err){
                console.log(err)
            } else{
                console.log("Updated user")
                res.redirect("/admin")
            }
        }
    )
});




module.exports = adminRouter;