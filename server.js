/* jshint node:true */

var express = require('express');

var PORT = process.env.PORT || process.argv[2] || 3000;

var app = express();


app.configure(function () {
  'use strict';

  app.use(express.logger({format: ':method :status :url'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/client'));
  app.use(express.errorHandler({dumpExceptions:true, showStack:true}));
});

require('./routes/index.js')(app);
require('./routes/scores.js')(app);

app.listen(PORT);
console.log('Server running on port: ' + PORT);
