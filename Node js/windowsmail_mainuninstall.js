var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'syn-mail-main-sntool-websocket',
  description: 'The websocket server for the System News Tool project.',
  script: 'D:\\Public\\SN_TOOL\\SN_main_mail.js'
});
 
// Listen for the 'uninstall' event so we know when it is done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
 
});
 
// Uninstall the service.
svc.uninstall();