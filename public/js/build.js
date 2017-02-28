var _ = require('lodash'), $ = require('jquery');
var apiUrl = '/api/';
initApp();
function initApp() {
    fetchApplicants();
}
function fetchApplicants() {
    $.get(apiUrl + '/applicants').then(function (response) {
        if (response && response.data && response.data.length) {
        }
    });
}
define('app', [], function () {
    return;
});