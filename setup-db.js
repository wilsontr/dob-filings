
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const logger = require('./logger');
const assert = require('assert');
const async = require('async');


var api_url = 'http://data.cityofnewyork.us/resource/rvhx-8trz.json';

fetch_api_data(api_url);

function fetch_api_data(url) {
	logger.info('Fetching NYC DOB API data...');
	http.get(url, (res) => {
		var body = '';

		res.on('data', (chunk) => {
			body += chunk;
		});

		res.on('end', () => {
			try {
				var responseData = JSON.parse(body);	
				insert_mongo_data(responseData);
			} catch (err) {
				logger.error('Error loading remote json data', err);
			}
		});
	}).on('error', (err) => {
		logger.error('Error acccessing json API URL', err);
	});	
}

function insert_mongo_data(data) {
	logger.info('Inserting data in mongodb...');
	var dbUrl = config.get('dbUrl');

	MongoClient.connect(dbUrl, (err, db) => {
		logger.info('Connected to server');

		var applicants = db.collection("applicants");

		applicants.remove();

		applicants.insert(data, (err, result) => {
			assert.equal(null, err);
			let rows = result.ops.length;

			logger.info(`API data inserted (${rows} documents)`);
			db.close();
			process.exit();
		});
	});
}

