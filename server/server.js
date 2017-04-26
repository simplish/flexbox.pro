const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 5000);

const staticPath = path.join(__dirname, '../build');

app.use('/', express.static(staticPath))

app.listen(app.get('port'), function () {
  console.log('Please visit http://localhost:' + app.get('port'));
});