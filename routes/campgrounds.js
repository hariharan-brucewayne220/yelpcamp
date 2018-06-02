var express=require("express"),
Campground=require("../models/campgrounds"),
router=express.Router(),
middlewareobj=require("../middleware")


router.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});
router.get("/",function(req,res){
    
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allcampgrounds});
        }
    });
        
});
router.post("/",middlewareobj.isLoggedin,function(req,res){
    var name=req.body.campname;
    var image=req.body.urlcampname;
    var desc=req.body.description;
    var author={id:req.user._id,
    username:req.user.username
        
    }
    var newcampground={name:name,image:image,description:desc,author:author};
    Campground.create(newcampground,function(err,newlycreated){
        
        if(err){
            console.log(err);
        }else{
             res.redirect("/campgrounds");
        }
    });
   
});

router.get("/new",middlewareobj.isLoggedin,function(req,res){
    res.render("campgrounds/new.ejs");
});
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:found});
        }
    });
});

//EDIT CAMPGROUND
router.get("/:id/edit",middlewareobj.checkcampgroundownership,function(req,res){
  
      Campground.findById(req.params.id,function(err,foundcampground){
        if(err){
            console.log(err);
        }
    res.render("campgrounds/edit",{campground:foundcampground});
           
        
      });

  
   
});

router.put("/:id",middlewareobj.checkcampgroundownership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.Campground,function(err,updatedcampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:id",middlewareobj.checkcampgroundownership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds");
    });
});



module.exports=router;