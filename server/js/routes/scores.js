/* jshint node:true */

var fs = require('fs');

module.exports = function (app) {
  'use strict';

  app.get('/getScores', getScores);
  app.post('/saveScores', saveScores);
};

function getScores(req, res) {
  'use strict';

    var scores = JSON.parse(fs.readFileSync('models/highScores.json'));
    res.send(scores);
}

function saveScores(req, res) {
  'use strict';

    var data = req.body.scores;
    fs.writeFile('models/highScores.json', JSON.stringify(data));
    res.send(data);
}
