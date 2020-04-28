var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'syn-mail-main-sntool-websocket',
  description: 'The websocket server for the System News Tool project.',
  script: 'D:\\Public\\SN_TOOL\\SN_main_mail.js'
});
 
// Listen for the 'install' event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
// install the service
svc.install();
console.log('Install complete.');