//Express server to use with heroku

const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

// Serve static files
app.use(express.static(__dirname + '/dist/CalvinNews'));

// create proxy options
const options = {
  target: 'https://calvin-cs262-fall2020-teamc.herokuapp.com',
  changeOrigin:true,
  pathRewrite: {
    '^/api/': '/', // remove base path
  },
};

const apiProxy = createProxyMiddleware('/api', options);

app.use('/api', apiProxy);

// Send all requests to index.html except api requests
app.get(/\/((?!api).)*/, function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/CalvinNews/index.html'));
});



// default Heroku PORT
app.listen(process.env.PORT || 3000);