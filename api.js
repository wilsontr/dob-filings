const express = require("express");
const app = express();
const router = express.Router();
const logger = require('./logger.js');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');

router.get("*", (req, res, next) => {
	res.setHeader('Content-type', 'application/json');
	next();
});


router.get("/applicants", (req, res, next) => {
	MongoClient.connect(config.get('dbUrl'), (err, db) => {
		var applicants = db.collection("applicants");	
		var pageSize = 10;
		var pageNum = 0;	
		var queryOptions = {
			"limit": pageSize,
			"pageNum": 0
		};

		applicants.find({}, queryOptions).toArray((err, result) => {
			if ( err ) {
				logger.error("Error fetching applicant records", err);
			} else {
				res.send(result);	
			}
			db.close();
		});
	});

});

module.exports = router;