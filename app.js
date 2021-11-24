//app of server
const express = require("express");                 //importing modules
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

require("./models");

const donorsTable = require("./controllers/donorsControllers");
const whereToDonateTable = require("./controllers/whereToDonateController");
const patientsTable = require("./controllers/patientsTableController");

//checking whether the user has logged in 
let userLoggedIn = false;


app.get("/",function(request,response){
    response.redirect("/home");
});

//the route to the home page
app.get("/home",function(request, response){
    response.sendFile(__dirname+"/html/homepage.html");
});


//the route to the find donor page
app.get("/find-donor",function(request,response){
    if(userLoggedIn){
        response.sendFile(__dirname+"/html/find_donor.html");
    }else{
        response.redirect("/login");
    }
});

//The route to the corona safety webpage 
app.get("/corona-safety",function(request,response){
    response.sendFile(__dirname+"/html/corona_safety.html");
});

//to route to the signup webpage
app.get("/signup",function(request,response){
    response.sendFile(__dirname+"/html/signup.html");
});

//handling the post req in the route signup
app.post("/signup",function(request,response){
    patientsTable.addPatient(request,response);
    response.redirect("/login");
})


app.get("/login",function(request,response){
    userLoggedIn = false;
    response.sendFile(__dirname + "/html/login.html");
});

app.post("/login",function(request,response){
    userLoggedIn = false;
    userLoggedIn = patientsTable.checkCredentials(request,response);
});


app.get("/not-eligible",function(request,response){
    response.sendFile(__dirname+"/html/not_eligible.html");
});


app.get("/where-to-donate",function(request,response){
    // response.sendFile(__dirname+"/html/where_to_donate.html");
    whereToDonateTable.getTheCities(request,response);
});

app.get("/register",function(request,response){
    response.sendFile(__dirname+"/html/register.html");
});

app.post("/register",function(request,response){
    // console.log(request.body);
    donorsTable.addDonors(request,response);
    response.redirect("/thank-you");
})


app.get("/thank-you",function(request,response){
    response.sendFile(__dirname+"/html/thankyouforReg.html");
});

app.get("/list-donor",function(request,response){
    if(userLoggedIn){
        donorsTable.getDonors(request,response);
    }else{
        response.redirect("/login");
    }
});
app.post("/list-donor",function(request,response){
    if(userLoggedIn){
        donorsTable.getDonors(request,response);
    }else{
        response.redirect("/login");
    }
});

//start the server in the port 3000
app.listen(3000,function(){
    console.log("The server is running at port 3000");
});
