/* app.js */

var _ = require('lodash'),
	$ = require('jquery');

var apiUrl = '/api/';

/*
(function($)) {
	initApp();
})(jQuery);
*/

initApp();

function initApp() {
	fetchApplicants();
}

function fetchApplicants() {
	$.get(apiUrl + '/applicants').then(function(response) {
		if ( response && response.data && response.data.length ) {

		}
	});
}