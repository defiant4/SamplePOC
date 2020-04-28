var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'syn-db-DL-sntool-websocket',
  description: 'The websocket server for the System News Tool project.',
  script: 'D:\\Public\\SN_TOOL\\SN_DL_server.js'
});
 
// Listen for the 'uninstall' event so we know when it is done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
 
});
 
// Uninstall the service.
svc.uninstall();