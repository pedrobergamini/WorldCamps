const express= require ("express"),
      router= express.Router(),
      Campground= require ("../models/campgrounds"),
      Comment= require ("../models/comment"),
      User= require ("../models/user"),
      middleware= require ("../middleware");


router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function (req,res){
   const campgroundID=req.params.id;
   Campground.findById(campgroundID, function (err,campground){
       if(err){
           req.flash("error", "Campground not found");
           console.log(err);
       } else{
   res.render("comments/new", {campground:campground});        
       }
   });
   
    
});
router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function (req,res){
  const campgroundID=req.params.id;
  Campground.findById(campgroundID, function (err, campground){
      if (err){
          req.flash("error", "Campground not found");
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          Comment.create({text:req.body.text}, function (err, comment){
              if (err){
                  req.flash("error", "Something went wrong...");
                  console.log(err);
              }
          
              else{
                  User.findById(req.user._id, function (err, currentUser){
                      if (err){
                          console.log(err);
                      } else {
              comment.author.id-req.user._id;
              comment.author.username=req.user.username;
              comment.save();
              campground.comments.push(comment);
              campground.save();
              currentUser.comments.push(comment);
              currentUser.save();
              req.flash("success", "Added New Comment");
              res.redirect("/campgrounds/"+campground._id);
                      }
                  });
          }
          }); 
          
      }
  });
});
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentAuthor,function (req,res){
    res.render("comments/edit", {comment:req.comment});
    
});
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentAuthor, function (req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err){
       if (err){
           console.log(err);
           res.redirect("back");
       } else{
           res.redirect("/campgrounds/"+req.params.id);
       }
    });
});
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentAuthor,function (req,res){
   Comment.findByIdAndRemove(req.params.comment_id, function (err){
       if(err){
           req.flash("error", "Something went wrong...");
           res.redirect("back");
       } else{
           req.flash("success", "Sucessfully deleted comment")
           res.redirect("back");
       }
   }); 
});
module.exports=router;