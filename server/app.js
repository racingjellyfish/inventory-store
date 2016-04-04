/**
 * a basic server for testing a JS API
 */
'use strict';

let bodyParser = require('body-parser');
let express = require('express');
let fs = require('fs');
let path = require('path');

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

app.delete('/api/bottle', function(req, res) {
	fs.readFile(DATA_FILE, function(err, data) {
		if (err) {
			console.error(err);
			res.status(500).send(err);
		}

		// update model
		var id = req.body.id;
		var inventoryState = JSON.parse(data);
		inventoryState.bottles = inventoryState.bottles.filter(function(bottle) {
			return bottle.id != id;
		});
		inventoryState.bottleToBatchLookup =
			inventoryState.bottleToBatchLookup.filter(function(bottleToBatch) {
			return bottleToBatch[0] != id;
		});

		// update data file using naive approach to preventing data corruption
		let tmpFile = DATA_FILE + '-' + Date.now();
		fs.writeFile(tmpFile, JSON.stringify(inventoryState, null, 4), function(err) {
			if (err) {
				console.error(err);
				fs.unlinkSync(tmpFile);
				res.status(500).send(err);
			}
			fs.unlinkSync(DATA_FILE);
			fs.renameSync(tmpFile, DATA_FILE);
			res.json(inventoryState);
		});
	});
});

app.put('/api/bottle', function(req, res) {
	fs.readFile(DATA_FILE, function(err, data) {
		if (err) {
			console.error(err);
			res.status(500).send(err);
		}

		// update model
		var bottleId = req.body.id;
		var batchId = req.body.batchId;
		var action = req.body.action;
		var inventoryState = JSON.parse(data);

		switch (action) {
			case 'FILLING':
				inventoryState.bottleToBatchLookup.push([bottleId, batchId]);
				break;

			case 'DRINKING':
				inventoryState.bottleToBatchLookup =
					inventoryState.bottleToBatchLookup.filter(function(bottleToBatch) {
					return bottleToBatch[0] != bottleId;
				});
				break;

			default:
				var actionError = 'unknown action: ' + action;
				console.error(actionError);
				res.status(500).send(actionError);
		}

		// update data file using naive approach to preventing data corruption
		let tmpFile = DATA_FILE + '-' + Date.now();
		fs.writeFile(tmpFile, JSON.stringify(inventoryState, null, 4), function(err) {
			if (err) {
				console.error(err);
				fs.unlinkSync(tmpFile);
				res.status(500).send(err);
			}
			fs.unlinkSync(DATA_FILE);
			fs.renameSync(tmpFile, DATA_FILE);
			res.json(inventoryState);
		});
	});
});

app.listen(app.get('port'), () => {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});
