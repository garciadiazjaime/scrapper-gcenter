'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cron = require('cron');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _reportRoutes = require('./routes/reportRoutes');

var _reportRoutes2 = _interopRequireDefault(_reportRoutes);

var _userRoutes = require('./routes/userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _stubRoutes = require('./routes/stubRoutes');

var _stubRoutes2 = _interopRequireDefault(_stubRoutes);

var _scrapperController = require('./controllers/scrapperController');

var _scrapperController2 = _interopRequireDefault(_scrapperController);

var _dbUtil = require('./utils/dbUtil');

var _mongoUtil = require('./utils/mongoUtil');

var _mongoUtil2 = _interopRequireDefault(_mongoUtil);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint max-len: [2, 500, 4] */
// import newrelic from 'newrelic';
var app = (0, _express2.default)();
var mongoUtil = new _mongoUtil2.default();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('tiny'));
// app.locals.newrelic = newrelic;

app.use('/report', _reportRoutes2.default);
app.use('/user', _userRoutes2.default);
app.use('/stub', _stubRoutes2.default);

app.get('/health', function (req, res) {
  res.writeHead(200);
  res.end();
});
app.get('*', function (req, res) {
  res.send('*');
});

app.set('ipaddress', _config2.default.get('ipaddress'));
app.set('port', _config2.default.get('port'));

var job = new _cron.CronJob('00 */15 * * * *', function () {
  (0, _scrapperController2.default)();
}, null, false, 'America/Los_Angeles');

mongoUtil.openConnection().then(function () {
  return (0, _dbUtil.openDatabase)(_config2.default.get('db.url'));
}).then(function () {
  var server = app.listen(app.get('port'), app.get('ipaddress'), function (err) {
    if (err) {
      console.log(err);
    }
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
    job.start();
  });
}).catch(console.log);