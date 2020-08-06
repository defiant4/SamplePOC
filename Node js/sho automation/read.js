// assuming the excel has static 4 sheets and 1 sheet as just rows and no column

var XLSX = require('xlsx')
var workbook = XLSX.readFile('<excel file path>');
var sheet_name_list = workbook.SheetNames;
var Planned_Activities = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
var DLM_Incidents = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
var SPC_Incidents = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]]);
var Special_Instruction = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[3]]);
var count =0;
console.log(sheet_name_list[0] +":");
var html2="";
if (Planned_Activities.length == 0){
html2= `<html>
<p><b><u>${sheet_name_list[0]}:</u></b></p>
<p><b>None.</b></p>
</html>`;
}
else{
for (var i=0;i<Planned_Activities.length;i++)
    {
        if(Planned_Activities[i]["Status"] == "Planned"){
            count++; break;
        }
        else{
           html2= `<html>
    <p><b><u>${sheet_name_list[0]}:</u></b></p>
    <p><b>None.</b></p>
    </html>`; 
        }
    }
    if(count > 0){
html2= `<html>
<p><b><u>${sheet_name_list[0]}:</u></b></p>
<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: auto;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: auto;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #FFFF00;
  color: black;
}
</style>
<table id="customers">
  <tr>
    <th>Responsible Team</th>
    <th>Incident Type</th>
    <th>Incident id</th>
    <th>System name/Landscape</th>
    <th>Planned Date</th>
    <th>Short Text</th>
    <th>Status</th>
    <th>Remark</th>
  </tr>
${Planned_Activities.map((i) => `
		
	${i["Status"] === "Planned" ?
		`<tr>
		<td> ${i["Responsible Team"]} </td>
              <td> ${i["Incident Type"]} </td>
              <td>${i["Incident id"]}</td>
              <td>${i["System name/Landscape"]}</td>
            <td>${(new Date((i["Planned Date"]- (25567 + 2))*86400*1000))}</td>
	<td>${i["Short Text"]}</td>
	<td>${i["Status"]}</td>
	<td>${i["Remark"]}</td>
		</tr>`:''}
 `).join('')}
</table>
</html>`;
    }
    count =0;
}
console.log(sheet_name_list[1] +":");
var html3="";
if (DLM_Incidents.length == 0){
html3= `<html>
<p><b><u>${sheet_name_list[1]}:</u></b></p>
<p><b>None.</b></p>
</html>`;
}
else{
for (var i=0;i<DLM_Incidents.length;i++)
    {
        if(DLM_Incidents[i]["Status"] == "In Process"){
            count++; break;
        }
        else{
           html3= `<html>
    <p><b><u>${sheet_name_list[1]}:</u></b></p>
    <p><b>None.</b></p>
    </html>`; 
        }
    }
    if(count > 0){
html3= `<html>
<p><b><u>${sheet_name_list[1]}:</u></b></p>
<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: auto;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: auto;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #FFFF00;
  color: black;
}
</style>
<table id="customers">
  <tr>
    <th>Responsible Team</th>
    <th>Incident id</th>
    <th>SID</th>
    <th>Priority</th>
    <th>Processor</th>
    <th>Short Text</th>
    <th>Status</th>
    <th>Remarks</th>
  </tr>
${DLM_Incidents.map((i) => `
		
	${i["Status"] === "In Process" ?
		`<tr>
		<td> ${i["Responsible Team"]} </td>
              <td> ${i["Incident id"]} </td>
              <td>${i["SID"]}</td>
              <td>${i["Priority"]}</td>
            <td>${i["Processor"]}</td>
	<td>${i["Short Text"]}</td>
	<td>${i["Status"]}</td>
	<td>${i["Remarks"]}</td>
		</tr>`:''}
 `).join('')}
</table>
</html>`;
    }
    count =0;
}
console.log(sheet_name_list[2] +":");
var html4="";
if (SPC_Incidents.length == 0){
html4= `<html>
<p><b><u>${sheet_name_list[2]}:</u></b></p>
<p><b>None.</b></p>
</html>`;
}
else{
for (var i=0;i<SPC_Incidents.length;i++)
    {
        if(SPC_Incidents[i]["Status"] == "Planned"){
            count++; break;
        }
        else{
           html4= `<html>
    <p><b><u>${sheet_name_list[2]}:</u></b></p>
    <p><b>None.</b></p>
    </html>`; 
        }
    }
    if(count > 0){
html4= `<html>
<p><b><u>${sheet_name_list[2]}:</u></b></p>
<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: auto;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: auto;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #FFFF00;
  color: black;
}
</style>
<table id="customers">
  <tr>
    <th>Incident id</th>
    <th>SID</th>
    <th>Priority</th>
    <th>Processor</th>
    <th>Short Text</th>
    <th>Status</th>
    <th>Remarks</th>
  </tr>
${SPC_Incidents.map((i) => `
		
	${i["Status"] === "Planned" ?
		`<tr>
		<td> ${i["Incident id"]} </td>
              <td> ${i["SID"]} </td>
              <td>${i["Priority"]}</td>
              <td>${i["Processor"]}</td>
	<td>${i["Short Text"]}</td>
	<td>${i["Status"]}</td>
	<td>${i["Remarks"]}</td>
		</tr>`:''}
 `).join('')}
</table>
</html>`;
    }
    count =0;
}


var html1="";
if (Special_Instruction.length == 0){

html1= `<html>
<p>Dear Colleagues,</p>
<p><b>Kindly take a note of below DLM (BCP) and NZA (SPC) incidents.</b></p>
<p><b><u>${sheet_name_list[3]}:</u></b></p>
<p><b>None.</b></p>
</html>`;
}

else{
html1= `<html>
<p>Dear Colleagues,</p>
<p><b>Kindly take a note of below DLM (BCP) and NZA (SPC) incidents.</b></p>
<p><b><u>${sheet_name_list[3]}':</u></b></p>
<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: auto;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: auto;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #FFFF00;
  color: black;
}
</style>	
<table id="customers">
${Special_Instruction.map((i) => `
		<tr>
	<td>${i}</td>
		</tr>
 `).join('')}
//for(var i=0;i<Special_Instruction.length;i++)
//{
//<tr>
//</tr>
//}
</table>
</html>`;
}

var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//var handlebars = require('handlebars');

//var template = handlebars.compile(html);
//var htmlToSend = template();



 var d = new Date();
 var ret =('0' + d.getDate()).slice(-2)+"-"+('0' + (d.getMonth() + 1)).slice(-2)+"-"+d.getFullYear();

var transporter =  nodemailer.createTransport({
//pool: true,
host: '',       //'proxy-tco.wdf.sap.corp',
secure: false,
port: 587,
auth: {
    user: '',
    pass: ''
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

var finalhtml ="";
var html5=`<html>
            <p>Regards,<br>
            RMDA.</p>
            </html>`;

finalhtml=html1+html2+html3+html4+html5;
var mailOptions = {
    from: '',
    to: ['arnab.adhikari@sap.com'],
    cc: ['arnab.adhikari@sap.com'],
    subject : 'DLM'+ret ,
    html : finalhtml

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






