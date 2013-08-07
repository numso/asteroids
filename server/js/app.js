/* jshint node:true */

var      fs = require('fs'),
    express = require('express'),
     stylus = require('stylus');

var app = express();
app.set('port', process.env.PORT || process.argv[2] || 3000);

var devConfig = function () {
  'use strict';

  app.use(express.favicon());
  app.use(stylus.middleware({
    debug: true,
    src: 'client',
    dest: 'client'
  }));
  app.use(express.static('client'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'W"G]8_&}s46Y1$jg11d8po$p[Vy<}${>'}));
  app.use(app.router);
  app.use(express.errorHandler());
};
app.configure('development', devConfig);
app.configure('localdev', devConfig);

var prodConfig = function () {
  'use strict';

  app.use(express.favicon());
  app.use(express.static('./build/'));

  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'Sls;;[KC:nH]"a4KP_O?-*s~G>*:(/1w'}));
  app.use(app.router);
};
app.configure('staging', prodConfig);
app.configure('production', prodConfig);

//routes
fs.readdirSync(__dirname + '/routes').forEach(
  function (file) {
    'use strict';

    require('./routes/' + file)(app);
  }
);

app.listen(app.get('port'),
  function () {
    'use strict';

    console.log('Express server listening on port ' + app.get('port') + ' in ' + process.env.NODE_ENV + ' mode.');
  }
);
