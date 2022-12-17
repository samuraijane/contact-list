const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const Sequelize = require('sequelize');
const { User } = require('./models');

const server = express();

server.use('/', express.static(__dirname + '/public'));
server.use('/contacts', express.static(__dirname + '/public'));
server.use(express.json());

// template engine
server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

server.get('/heartbeat', (req, res) => {
  res.json({
    "is": "working"
  })
});

const { contacts } = require('./routes');
server.get('/', (req, res) => {
  res.render('landing', {
    partials: {
      footer: 'partials/footer',
      head: 'partials/head',
      header: 'partials/header',
    }
  });
});

server.use('/contacts', contacts);


server.listen('8080', () => {
  console.log('The server is running at Port 8080');
});
