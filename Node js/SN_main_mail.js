var express=require('express');
var nodemailer = require('nodemailer');
var app=express();


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
//var smtpTransport = require('nodemailer-smtp-transport');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var transporter =  nodemailer.createTransport({
//pool: true,
host: 'mail.sap.corp',       //'proxy-tco.wdf.sap.corp',
secure: false,
port: 587,
auth: {
    user: '<username>',
    pass: '<password>'
}
// tls: {
//     // do not fail on invalid certs
//     rejectUnauthorized: false,
//     ciphers:'SSLv3'
//   }

});


transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

/*------------------Routing Started ------------------------*/  

 app.get('/',function(req,res){
   res.sendfile('index.html');
 }); 

 readHTMLFile(__dirname + 'app/public/pages/emailWithPDF.html', function(err, html) {
  var template = handlebars.compile(html);
  var replacements = {
       username: "John Doe"
  };
  var htmlToSend = template(replacements);

 app.get('/send',function(req,res){
var mailOptions = {
    from: '<from email ids>',
    to: '<to email ids>',//req.query.to,
    //cc: <cc email ids>,
    subject : 'Guess your Santa?'//req.query.subject,
    //text = 'Hello'
}
transporter.sendMail(mailOptions, function(error, info) {
    if(error){
        console.log("Error in sending mail");
        //res.status
    }
    else{
        console.log('Email sent:' + info.response);
    }
    //transporter.close();
});
});
 });

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
  console.log("Express Started on Port 3000");
});


