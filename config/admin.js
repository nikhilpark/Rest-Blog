module.exports = {
    ensureAdmin: function (req, res ,next){
        if(req.user.isAdmin){
            return next();
        }
        console.log("not admin")
        req.flash('error_msg','You are not authorised for this action');
        res.redirect('/blog');

    }
}