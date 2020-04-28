var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var handlebars = require('handlebars');

var html1= '<html>\
<p>The status is TRUE</p>\
<p>The data is hello world</p>\
<p>The message is User registered successfully\
</html>';
  

//var template = handlebars.compile(html);
//var htmlToSend = template();




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

var mailOptions = {
    from: '<from email id>',
    to: '<to email id>',
    cc: '<cc email ids>',
    subject : 'Test Mail for SN Tool DEMO',
    html : html1

//    text: 'Success! Please ignore this mail.'
};
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


