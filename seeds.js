var mongoose=require("mongoose"),
 Campground=require("./models/campgrounds"),
 Comment=require("./models/comment")

var data = [
       {name:"Stark",image:"https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137__340.jpg",description:"this is goood"},
       {name:"Wayne",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",description:"this is coool and nice"},
       {name:"Jay",image:"https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606__340.jpg",description:"this is goood and great"}
       ];
       
      
      function seedDB(){
          Campground.remove({},function(err){
             if(err){
                console.log(err);
            }else{
                 console.log("removed all backgrounds");
                data.forEach(function(seed){
                     Campground.create(seed,function(err,campground){
                        if(err){
                           console.log(err);
                        }else{
                        console.log("Added backgrounds");
                             Comment.create({text:"this so so soooo beautiful",author:"stan lee"},function(err,comment){
                                 if(err){
                                   console.log(err);
                               }else{
                                     campground.comments.push(comment);
                                     campground.save();
                                     console.log("added comments");
                                 }  
                            });
                          }
                      });
                 });
             }
          });
      }
      
          module.exports=seedDB;