const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
require('console-stamp')(console, '[HH:MM:ss.l]');

// application config
const { config, envConfig } = require('./lib/config');

// form handler
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Mapping the EJS template engine to ".html" files
app.engine('html', require('ejs').renderFile);

// public
app.use(express.static(path.join(__dirname, '/public')));

// welcome controller
router.get('/', (req, res) => {
  // application welcome page & its variables
  res.render(path.resolve(__dirname, './views/index.html'), {
    appTitle: config.appTitle,
    appOwner: config.appOwner,
    message: ''
  });
});
// form post data
router.post('/form-data', (req, res) => {
  // application welcome page & its variables
  const ip1 = req.body.ip1;
  const ip2 = req.body.ip2;
  const ip3 = req.body.ip3;
  const ip4 = req.body.ip4;
  var viewTemplate = 'matrix-table.html';
  var message = '';
  if (!ip1 || !ip2 || !ip3 || !ip4) {
    viewTemplate = 'index.html';
    message = 'All fields are required';
  }

  res.render(path.resolve(__dirname, './views/' + viewTemplate), {
    appTitle: config.appTitle,
    appOwner: config.appOwner,
    message: message,
    formData: { ip1: ip1, ip2: ip2, ip3: ip3, ip4: ip4 }
  });
});
// add the router
app.use('/', router);
// server port
app.listen(envConfig.port);
console.log('Running at Port ' + envConfig.port);
