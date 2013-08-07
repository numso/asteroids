/* jshint node:true */

module.exports = function (app) {
  'use strict';

  app.get('/stopServer', stopServer);
};

function stopServer(req, res) {
  'use strict';

  process.exit();
  res.send('ok');
}
