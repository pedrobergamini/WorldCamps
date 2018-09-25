const express= require ("express"),
      router= express.Router(),
      Campground= require ("../models/campgrounds"),
      middleware= require ("../middleware");

router.get("/campgrounds", function(req,res){
   
   Campground.find({}, function (err, allCampgrounds){
       if (err){
           req.flash("error", "Something went wrong...");
           res.redirect("back");
       } else{
        res.render("campgrounds/index", {campgrounds:allCampgrounds});   
       }
       
   });
        
    
});
router.post("/campgrounds",middleware.isLoggedIn, function (req,res){
    const name= req.body.name;
    const image= req.body.image;
    const description= req.body.description;
    const author={
        id:req.user._id,
        username:req.user.username
    };
    Campground.create({
        name:name,
        image:image,
        description: description,
        author:author
    }, function (err, newCampground){
       if (err){
           req.flash("error", "Couldn't create new campground");
           res.redirect("back");
       } else{
           req.flash("success", "Sucessfully created new campground")
          res.redirect("/campgrounds");
       }
    });
    
});
router.get("/campgrounds/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
    
});

router.get("/campgrounds/:id", function (req,res){
    var campgroundID= req.params.id;
    Campground.findById(campgroundID).populate("comments").exec(function(err, foundCampground){
        if (err){
            req.flash("error", "Something went wrong...");
            console.log(err);
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
    
});
router.get("/campgrounds/:id/edit",middleware.checkCampgroundAuthor, function (req,res){
    res.render ("campgrounds/edit", {campground: req.campground});
});
router.put("/campgrounds/:id",middleware.checkCampgroundAuthor, function (req,res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err,updatedCampground){
       if (err){
           req.flash("error", "Something went wrong...");
           console.log(err);
           return res.redirect ("/campgrounds");
       }
       res.redirect("/campgrounds/"+updatedCampground._id);
   }); 
});
router.delete("/campgrounds/:id",middleware.checkCampgroundAuthor, function (req,res){
   Campground.findByIdAndRemove(req.params.id, function (err){
       if (err){
           req.flash("error", "Something went wrong...");
           return console.log(err);
       }
       req.flash("success", "Deleted campground");
       res.redirect("/campgrounds");
   });
});

module.exports=router;