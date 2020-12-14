const express = require('express');
const path = require('path');
const app = express();
const proxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Serve static files....
app.use(express.static(__dirname + '/dist/CalvinNews'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/CalvinNews/index.html'));
});

const options = {
  target: 'https://calvin-cs262-fall2020-teamc.herokuapp.com',
  pathRewrite: {
    '^/api/': '/', // remove base path
  },
};

const apiProxy = createProxyMiddleware('/api', options);

app.use(apiProxy);

// default Heroku PORT
app.listen(process.env.PORT || 3000);