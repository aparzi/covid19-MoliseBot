const express = require('express');
const path = require('path');
const app = express();

app.listen(process.env.PORT || 3000, function(){
    console.log("------------- SERVER START -------------");
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ng-backoffice-covid19'));
// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ng-backoffice-covid19/index.html'));
});

