//
// IoT REST API
// Author: L. Saetta
// vers: 1.0
// last update: 24/01/2016
//
// Configuration Parameter
//
var PORT = 3000

var express = require('express');

// root of url
var rt = '/api/v1/';

//
// use module temps e status in sub-directory routes
//

// to read temperature
temps = require('./routes/temps');
// to read status of a sensor node
status = require('./routes/status');

var app = express();

// decorators defining Routing Rules
// implements Controller

// single device temp (id)
app.get(rt + 'temps/:id', temps.handle_get_temp);

// all device temp
app.get(rt + 'temps', temps.handle_get_all_temp);

// get single sensor status
app.get(rt + 'sensors/:id/status', status.handle_get_sensor_status);

// launch the server
app.listen(PORT);

console.log('Listening on port ' +  PORT + ' ...');
