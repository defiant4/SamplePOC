//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 3003, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
     user: "<username>",
    password: "<password>",
    server: "localhost",  //10.66.11.218
    // port : 1433,
    database: "sn_demo",
    // encrypt: true,
       // debug: true 

};

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
   sql.connect(dbConfig, function (err) {
       if (err) {   
                   console.log("Error while connecting database :- " + err);
                   res.send(err);
                }
                else {
                       // create Request object
                       var request = new sql.Request();
                       // query to the database
                       request.query(query, function (err, result, next) {
                         if (err) //{
                                    //console.log("Error while querying database :- " + err);
                                   return next(err);// res.send(err);
                                   var data;
                                   data = result.recordset;
                                   //res.send(data);
                                   res.send(JSON.stringify(data,null,4));
                                   //}
                                  // else {
                                      // console.log("Reached here");
                              // res.send(result);
                                        //  }
                             });
                     }
    });           
}


//GET API
app.get("/api/user", function(req , res){
   //console.log("Responding...");
   //res.send("LOL\\Hello...");
                var query = "Select * from dbo.Demo1";
                executeQuery (res, query);
});

/*
//POST API
 app.post("/api/user", function(req , res){
                var query = "INSERT INTO dbo.Demo1 (Name,Email,Password) VALUES (' " + req.body.Name + " ',' " + req.body.Email + " ',' " + req.body.Password + " ')";
                executeQuery (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
                var query = "UPDATE dbo.Demo1 SET Name= ' " + req.body.Name + " ' , Email= ' " + req.body.Email + " ' WHERE Id= " + req.params.id;
                executeQuery (res, query);
});
*/

// DELETE API
 app.delete("/api/user/:id", function(req , res){
                var query = "DELETE FROM dbo.Demo1 WHERE Id=" + req.params.id;
                executeQuery (res, query);
});
