const express = require('express');
const path = require('path');
const app = express();

const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api', createProxyMiddleware({
  target: 'https://calvin-cs262-fall2020-teamc.herokuapp.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
}));

// Serve static files....
app.use(express.static(__dirname + '/dist/CalvinNews'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/CalvinNews/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);