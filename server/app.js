/**
 * a basic server for testing a JS API
 */
'use strict';

let bodyParser = require('body-parser');
let path = require('path');
let express = require('express');
let fs = require('fs');

let DATA_FILE = path.join(__dirname, '../public/data.json');

let app = express();

app.set('port', (process.env.PORT || 8181));

app.use(bodyParser.json());

// set various headers useful on a testing server
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

app.use('/', express.static(path.join(__dirname, '../public')));

app.post('/api/bottle', function(req, res) {
	fs.readFile(DATA_FILE, function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var id = req.body.id;
		var inventoryState = JSON.parse(data);
		inventoryState.bottles = inventoryState.bottles.filter(function(bottle) {
			return bottle.id != id;
		});
		inventoryState.bottleToBatchLookup =
			inventoryState.bottleToBatchLookup.filter(function(bottleToBatch) {
			return bottleToBatch[0] != id;
		});
		fs.writeFile(DATA_FILE, JSON.stringify(inventoryState, null, 4), function(err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(inventoryState);
		});
	});
});

app.listen(app.get('port'), () => {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});
