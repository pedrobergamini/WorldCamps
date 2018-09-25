const middlewareObj={};
const Comment= require ("../models/comment.js");
const Campground= require ("../models/campgrounds.js");

middlewareObj.isLoggedIn= function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first");
    res.redirect("/login");
    

};
middlewareObj.checkCommentAuthor= function(req,res,next){
     if(req.isAuthenticated()){
       Comment.findById(req.params.comment_id, function (err,foundComment){
       if (err || !foundComment){
            req.flash("error", "Comment Not Found");
            res.redirect("back");
       } else {
           if(foundComment.author.username==req.user.username){
               req.comment=foundComment;
               next();
           } else {
               req.flash("error", "You don't have Permission to do that");
               res.redirect('/campgrounds/' + req.params.id);
           }
       } 
     
       
    });    
      }
      else{
          req.flash("error", "Please Login First");
          res.redirect("back");
      }
      
     
 
};
middlewareObj.checkCampgroundAuthor=function (req,res,next){
     if(req.isAuthenticated()){
       Campground.findById(req.params.id, function (err,foundCampground){
      if(err || !foundCampground){
          console.log(err);
          req.flash('error', 'Sorry, that campground does not exist!');
          res.redirect('/campgrounds');
      } else if(foundCampground.author.username===req.user.username){
          req.campground = foundCampground;
          next();
      } else {
          req.flash('error', 'You don\'t have permission to do that!');
          res.redirect('/campgrounds/' + req.params.id);
      }
       
    });    
      }
      else{
          res.redirect("back");
      }
};
middlewareObj.blockLogin= function(req,res,next){
    if(req.isAuthenticated()){
        req.flash("error", "You already are logged in");
        return res.redirect("/campgrounds");
    }
    next();
};
module.exports=middlewareObj;