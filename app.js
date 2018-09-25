const express= require("express");
const app= express();
const bodyParser= require ("body-parser");
const mongoose= require("mongoose");
const passport= require ("passport");
const localStrategy= require ("passport-local");
const expressSession= require ("express-session");
const User= require ("./models/user.js");
const indexRoutes= require ("./routes/index");
const campgroundRoutes= require ("./routes/campground");
const commentRoutes= require ("./routes/comments");
const methodOverride= require ("method-override");
const flash         =require ("connect-flash");
mongoose.connect("mongodb://localhost/yelp_camp_v8");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(flash());
// PASSPORT CONFIG
app.use(expressSession({
    secret:"sdfhsdfgjsdflgsdfgçseiçghweoçrgtnjasdsad1239842",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});
app.use(methodOverride("_method"));
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!");
});