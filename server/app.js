/**
 * a basic server for testing a JS API
 */
'use strict';

let path = require('path');
let express = require('express');

let app = express();

app.set('port', (process.env.PORT || 8080));
app.use('/', express.static(path.join(__dirname, '../public')));

// set various headers useful on a testing server
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

app.listen(app.get('port'), () => {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});
