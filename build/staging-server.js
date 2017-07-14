var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var distFolder = path.join(__dirname, '../', 'dist');

app = express();
app.use(serveStatic(distFolder));

app.get('*', function(req, res) {
  res.sendFile(path.join(distFolder, 'index.html'));
})

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);
