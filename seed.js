// USE THIS FUNCTION TO SEED DATABASE
const  Campground= require("./models/campgrounds");
const Comment= require ("./models/comment");
      
const data=[
    {
        name:"Belo Monte",
        image:"http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg",
        description:"bla bla bla b la bla bla bla"
    },
     {
        name:"Campo Verde",
        image:"https://www.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
        description:" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an un b la bla bla bla"
    },
     {
        name:"Morro Belo",
        image:"https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and tyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an un b la bla bla blLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an un b la bla bla blLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an un b la bla bla blLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an un b la bla bla blLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an un b la bla bla blLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an un b la bla bla blLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an un b la bla bla blLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an un b la bla bla blpesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    ];      
       
       
       function seedDB (){
      Campground.remove({}, function (err){
         if (err){
             console.log(err);
         } console.log ("removed campground"); 
         data.forEach(function (data){
            Campground.create(data, function (err,campground){
             if (err){
                 console.log (err);
            } else {
                console.log("ADDED CAMPGROUND!");
                Comment.create({
                    text:"WOW! Que lugar mais irado! Preciso conhecer",
                    author:"Robesvaldo"
                }, function (err,comment){
                    if (err){
                        console.log(err);
                    } else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment!");
                    }
                });
            }}); 
         });
         
      });
      }
      
      module.exports=seedDB;