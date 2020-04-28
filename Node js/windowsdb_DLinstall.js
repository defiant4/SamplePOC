var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'syn-db-DL-sntool-websocket',
  description: 'The websocket server for the System News Tool project.',
  script: 'D:\\Public\\SN_TOOL\\SN_DL_server.js'
});
 
// Listen for the 'install' event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
// install the service
svc.install();
console.log('Install complete.');