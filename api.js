const express = require("express");
const app = express();
const router = express.Router();
const logger = require('./logger.js');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const assert = require('assert');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectID;

router.get("*", (req, res, next) => {
	res.setHeader('Content-type', 'application/json');
	next();
});



router.get("/applicants", (req, res, next) => {
	MongoClient.connect(config.get('dbUrl'), (err, db) => {
		var applicants = db.collection("applicants");	
		var pageSize = 20;
		var pageNum = _.get(req, 'query.pageNum', 0);
		var lastPage = false;
		var searchTerm = _.get(req, 'query.searchTerm', '');
		var searchField = _.get(req, 'query.searchField', '');
		var sortField = _.get(req, 'query.sortField', '');
		var queryOptions = {
			"limit": pageSize,
			"skip": pageNum * pageSize
		};

		if ( sortField ) {
			queryOptions['sort'] = sortField;
		}

		var query = {};

		if ( searchTerm && searchField ) {
			var searchRegex = new RegExp(searchTerm, 'gi');
			query[searchField] = { $regex: searchRegex };
		}

		applicants.find(query, queryOptions).toArray((err, result) => {
			if ( err ) {
				logger.error("Error fetching applicant records", err);
				res.send([]);
			} else {
				if ( result.length < pageSize ) {
					lastPage = true;
				}
				
				res.send({
					result: processRecords(result),
					lastPage: lastPage
				});	
			}
			db.close();
		});
	});
});

router.get("/applicant/fields", (req, res, next) => {
	MongoClient.connect(config.get('dbUrl'), (err, db) => {
		var applicants = db.collection("applicants");	

		applicants.findOne({}, (err, doc) => {
			if ( err || !doc ) {
				logger.error("Error fetching search fields", err);
				res.send({});
			} else {
				let keys = _.keys(doc);
				res.send(keys);
			}
			db.close();
		});

	});
});

router.get("/applicant/:id", (req, res, next) => {
	MongoClient.connect(config.get('dbUrl'), (err, db) => {
		var applicants = db.collection("applicants");	
		var id = _.get(req, 'params.id', '');

		applicants.findOne({"_id": ObjectId(id)}, (err, doc) => {
			if ( err || !doc ) {
				logger.error("Error fetching applicant", err);
				res.send({});
			} else {
				res.send(doc);
			}
			db.close();

		});

	});
});


function processRecords(records) {
	_.each(records, (record) => {
		record.full_name = [_.trim(record.applicant_s_last_name), _.trim(record.applicant_s_first_name)].join(", ");
	});

	return records;
}

module.exports = router;