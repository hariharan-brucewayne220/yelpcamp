
var express=require("express"),
    flash=require("connect-flash"),
    app=express(),
    bodyparse=require("body-parser"),
    mongoose=require("mongoose"),
    Campground=require("./models/campgrounds"),
    Comment=require("./models/comment"),
    seedDB=require("./seeds"),
    passport=require("passport"),
    Localstrategy=require("passport-local"),
    User=require("./models/user"),
    methodOverride=require("method-override")
app.use(require("express-session")({
    secret:"I am Batman",
    resave:false,
    saveUninitialized:false
}));
  app.use(flash());
  app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});
 //seedDB();

 var campgroundRoutes=require("./routes/campgrounds"),
     commentRoutes=require("./routes/comments"),
     indexRoutes=require("./routes/index")
     


mongoose.connect("mongodb://localhost/yelp_camp_v10");
app.use(bodyparse.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());
app.use(commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);

passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));


//Campground.create({name:"Wayne",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",description:"cold place"},function(err,campground){
   // if(err){
     //  console.log("ERROR");
      // console.log(err);
 // }else{
  //    console.log(campground);
 // }
//});

//var campgrounds = [
     //   {name:"hariharan",image:"https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137__340.jpg"},
     //   {name:"Wayne",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg"},
      //   {name:"Bruce",image:mong},
       //  {name:"hariharan",image:"https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137__340.jpg"},
       // {name:"Wayne",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg"},
      //  {name:"Bruce",image:"https://cdn.pixabay.com/photo/2017/02/14/03/03/ama-dablam-2064522__340.jpg"}
      //  ];




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp server has started");
});



