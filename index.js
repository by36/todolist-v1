//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

// create a date object that requires the date.js file
const date = require(__dirname + "/date.js");

const app = express();

// set an array for the default items in the list
let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food", "Clean Plates"];
// set an empty array for new work items
let workItems = ["Show Up", "Get Settled", "Drink Coffee"];
// set an array for Fun and another for Weekend
let funItems = ["Watch a movie with friends", "Play video games online", "Go out for a karaoke night"];
let weekendItems = ["Clean the house", "Go grocery shopping", "Spend time with family"];
let finalExamItems = ["ICS360", "ICS385", "BUS320"];

// setup EJS as the viewing engine to display html
app.set('view engine', 'ejs');

// use body parser to parse html file
app.use(bodyParser.urlencoded({extended: true}));

// use Express to serve or display static files such as images, CSS, JS files etc.
app.use(express.static("public"));

// default html file in web server
app.get("/", function(req, res) {

    //get the system date from the getDate function exported by the date.js file
    let day = date.getDate();
    
    // use EJS render to display the day and the To Do List
    res.render("list", {listTitle: day, newListItems: items});
    
});

// display default to do list on the default root folder
app.post("/", function(req, res) {
    
    // code allows items to be added to the regular list and work list
    let item = req.body.newItem;
    
    // if route is /work, add to work list
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } 
    // if route is /fun, add to fun list
    else if (req.body.list === "Fun") {
        funItems.push(item);
        res.redirect("/fun");
    }
    // if route is /weekend, add to weekend list
    else if (req.body.list === "Weekend") {
        weekendItems.push(item);
        res.redirect("/weekend");
    }
    // if route is /finalExam, add to finalExam list
    else if (req.body.list === "finalExam") {
        finalExamItems.push(item);
        res.redirect("/finalExam");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});

// display default to do list on the localhost:3000/work route!
app.get("/work", function(req, res){

    res.render("list", {listTitle: "Work Items To-Do List", newListItems: workItems})
});

// display default to do list on the localhost:3000/fun route!
app.get("/fun", function(req, res){

    res.render("list", {listTitle: "Fun Items To-Do List", newListItems: funItems})
});

// display default to do list on the localhost:3000/weekend route!
app.get("/weekend", function(req, res){

    res.render("list", {listTitle: "Weekend Items To-Do List", newListItems: weekendItems})
});

app.get("/finalExam", function(req, res){

    res.render("list", {listTitle: "Final Exam To-Do List", newListItems: finalExamItems})
});

app.listen(3000, function() {
    console.log ("Server is running on port 3000")
});
