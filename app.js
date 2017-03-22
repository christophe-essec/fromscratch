var express = require("express");
var bodyParser = require("body-parser");
var exphbs  = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var clientList = [];


var url = 'mongodb://localhost:27017/professorspace';

// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server",err);
 
  

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

		db.collection('clients').insert({name : req.body.clientName}, function(err, result) {

    		console.log("Insertion réalisée",err,result);
    		//db.close();
    		res.redirect("/");
  		});

	});

	app.get('/', function (req, res) {
		db.collection('clients').find({}).toArray(function(err,clients){
			console.log("clients",clients);
			var result = clients.map(function(item,index){
				item.number = index;
				return item;
			});

		    res.render('home',{clients:result});
		});
	});

});

app.listen(8080,function(err){
  console.log("Application started on port 8080 !");
});
