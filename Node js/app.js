var express =  require("express");
var app = express();

app.get("/", (req,res) => {
    console.log("Responding...");
    res.send("Hello...");
})

app.listen(3002 ,() => {
    console.log("Server is up and listening on 3002");
})