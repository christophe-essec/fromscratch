var express = require("express");
var bodyParser = require("body-parser");
var exphbs  = require('express-handlebars');

var app = express();
var clientList = [];

//Permet de lire les paramètres envoyés dans un formulaire
app.use(bodyParser.urlencoded({extended:true}));

//Permet d'utiliser Handlebars comme moteur de rendu de template HTML
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Permet d'utiliser le rep 'Static' pour envoyer des fichiers non dynamiques
app.use(express.static("static"));

app.get("/hello",function(req,res){
  res.send("Hello World");
});

app.post("/newuser",function(req,res){

	clientList.push(req.body.clientName);
	console.log(clientList);

	res.redirect("/");
});

app.get('/', function (req, res) {
	var result = clientList.map(function(item,index){
		return {name:item,number:index};
	});

    res.render('home',{clients:result});
});

app.listen(8080,function(err){
  console.log("Application started on port 8080 !");
});
