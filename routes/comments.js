var express=require("express"),
router=express.Router({mergeParams:true}),
Campground=require("../models/campgrounds"),
Comment=require("../models/comment"),
middlewareobj=require("../middleware")


router.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});
router.get("/campgrounds/:id/comments/new",middlewareobj.isLoggedin,function(req,res){
    Campground.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:found});
        }
    });
   
});

router.post("/campgrounds/:id/comments",middlewareobj.isLoggedin,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{

            Comment.create(req.body.comment,function(err,comment){
                   if(err){
                        console.log(err);
                    }else{
                        comment.author.id=req.user._id;
                        comment.author.username=req.user.username;
                        comment.save();
                        campground.comments.push(comment);
                        campground.save();
                        req.flash("success","successfully added comment");
                        res.redirect("/campgrounds/" + campground._id);
                    }
            });
        }
    });
   
});

router.get("/campgrounds/:id/comments/:comments_id/edit",middlewareobj.checkcommentownership,function(req,res){
    Comment.findById(req.params.comments_id,function(err,comment){
        if(err){
            res.redirect("back");
        }
           res.render("comments/edit",{campground_id:req.params.id,comment:comment});
    });
});


router.put("/campgrounds/:id/comments/:comments_id",middlewareobj.checkcommentownership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comments_id,req.body.comment,function(err,comment){
        
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
router.delete("/campgrounds/:id/comments/:comments_id",middlewareobj.checkcommentownership,function(req,res){
    Comment.findByIdAndRemove(req.params.comments_id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds/"+req.params.id);
    });
});



module.exports=router;