var middlewareobj={}
var Campground=require("../models/campgrounds"),
Comment=require("../models/comment")

middlewareobj.checkcampgroundownership=function (req,res,next){
     if(req.isAuthenticated()){
      Campground.findById(req.params.id,function(err,foundcampground){
        if(err){
            res.redirect("back");
        }else{
           if(foundcampground.author.id.equals(req.user._id)){
            next();
           }else{
               res.redirect("back");
           }
        }
      });

   }else{ req.flash("error","you dont have permission to do that");
       res.redirect("back")
   }
   

}


middlewareobj.checkcommentownership=function (req,res,next){
     if(req.isAuthenticated()){
      Campground.findById(req.params.id,function(err,foundcampground){
        if(err){
            req.flash("error","campground not found");
            res.redirect("back");
        }else{
           if(foundcampground.author.id.equals(req.user._id)){
            next();
           }else{
               res.redirect("back");
           }
        }
      });

   }else{
       req.flash("error","you dont have permission to do that");
       res.redirect("back")
   }
   

}

middlewareobj.isLoggedin=function (req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash("error","You should login first");
    res.redirect("/login");
}

module.exports=middlewareobj;