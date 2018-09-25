const express= require ("express"),
      router= express.Router(),
      User= require ("../models/user"),
      passport=require ("passport"),
      middleware= require ("../middleware");

//  ROUTES
router.get("/", function(req,res){
    res.render("landing");
    
});

// AUTH ROUTES
router.get("/register", function (req,res){
    res.render("register");
});
router.post("/register", function (req,res){
    User.register(new User({username:req.body.username}), req.body.password, function (err,user){
       if (err){
           req.flash("error", err.message);
           return res.redirect("/register");
       }
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "Welcome to WorldCamps "+user.username+"!");
            res.redirect("/campgrounds");
        });
    });
});
router.get("/login",middleware.blockLogin, function (req,res){
    res.render("login");
});
router.post("/login",middleware.blockLogin,passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), function (req,res){
    req.flash("success", "Welcome Back "+ req.user.username + "!");
});

router.get("/logout", function (req,res){
    req.logout();
    req.flash("success", "Logged you Out!");
    res.redirect("/campgrounds");
});
module.exports= router;
