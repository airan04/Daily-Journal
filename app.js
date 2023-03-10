//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash")

const homeStartingContent = "Welcome to our daily journal website! Here, you can create and maintain a personal journal to record your thoughts, ideas, and experiences on a daily basis. Keeping a journal is a powerful tool for self-reflection and personal growth, as it allows you to explore your emotions, track your progress, and gain insights into your own thought processes.Whether you are a seasoned journaler or new to the practice, our website is designed to support you on your journey of self-discovery and personal growth. So start writing today, and see where your journal takes you!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts=[];

app.get("/",function(req,res){
  res.render("home",
  {
    startingContent:homeStartingContent,
    posts:posts
  });
});
app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:postName",function(req,res){
  const requestedTitle=_.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle=_.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post",{
        title:post.title,
        content:post.content
      });
    }
  });
});

app.post("/compose",function(req,res){
  const post={
    title:req.body.postTitle,
    content:req.body.postBody
  }
  posts.push(post);
  res.redirect("/");
})









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
