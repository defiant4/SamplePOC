//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

var https = require("https");
var fs = require("fs");
var options = {  
    key: fs.readFileSync('<key path>', 'utf8'),  
    cert: fs.readFileSync('<certificate path>', 'utf8')  
};  

// // Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");// "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
        } else {
          next();}
   // next();
});

//Setting up server
 var server = https.createServer(options,app).listen(process.env.PORT || 3002, function () {

    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
const pool = new sql.ConnectionPool({
     user: "<username>",
    password: "<password>",
    server: "localhost",  //10.66.11.218
    // port : 1433,
    database: "sn_db",
    // encrypt: true,   
    // debug: true 

})

var conn = pool;

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
   conn.connect().then(function () {
    //    if (err) {   
    //                console.log("Error while connecting database :- " + err);
    //                res.send(err);
    //             }
    //             else {
                       // create Request object
                       var request = new sql.Request(conn);
                       // query to the database
                       request.query(query).then(function (result) {
                        //  if (err){ //{
                        //             //console.log("Error while querying database :- " + err);
                        //            return next(err);
                        //         dbConfig.close();}// res.send(err);
                                   
                                   var data;
                                   data = result.recordset;
                                   //res.send(data);
                                   res.send(JSON.stringify(data, null, 4));
                                   conn.close();

                                   //}
                                  // else {
                                      // console.log("Reached here");
                              // res.send(result);
                                        //  }
                             })
                             .catch(function (err) {
                                console.log("Error while querying database :- " + err);
                                res.send(err);
                                conn.close();
                            });

                        })
                        .catch(function (err) {
                            console.log("Error while connecting database :- " + err);
                            res.send(err);
                        });
                            //}         

}


//GET API
app.get("/api/user", function(req , res){
   //console.log("Responding...");
   //res.send("LOL\\Hello...");
                var query = "Select * from dbo.tSystemNews";
                executeQuery (res, query);
});

//POST API
 app.post("/api/user", function(req , res){
                var query = "INSERT INTO dbo.tSystemNews (Product,Landscape,Environment,StartDate,EndDate,Status,Issue,IncidentDescription,Impact,Solution,TicketSystem,TicketNumber,ReporterID) VALUES (' " + req.body.Product + " ',' " + req.body.Landscape + " ',' " + req.body.Environment + " ',' " + req.body.StartDate + " ',' " + req.body.EndDate +  " ',' " + req.body.Status + " ',' " + req.body.Issue +  " ',' " + req.body.IncidentDescription + " ',' " + req.body.Impact + " ',' " + req.body.Solution + " ',' " + req.body.TicketSystem + " ',' " + req.body.TicketNumber + " ',' " + req.body.ReporterID + " ')";
                executeQuery (res, query);
});

/*
//PUT API
 app.put("/api/user/:id", function(req , res){
                var query = "UPDATE dbo.Demo1 SET Name= ' " + req.body.Name + " ' , Email= ' " + req.body.Email + " ' WHERE Id= " + req.params.id;
                executeQuery (res, query);
});
*/

// DELETE API
 app.delete("/api/user/:id", function(req , res){
                var query = "DELETE FROM dbo.tSystemNews WHERE ID=" + req.params.id;
                executeQuery (res, query);
                var req_id =  req.params.id-1;
                if ( req_id!=0){
                    var querydbcc = "DBCC CHECKIDENT ('dbo.tSystemNews', RESEED, req_id)";
                    executeQuery (res, querydbcc);
                }
});
