/* app.js */

var apiUrl = '/api/';
var rootElement = '#appRoot';

(function() {
	initApp();	
}());


function initApp() {
	fetchApplicants();
}

function fetchApplicants() {
	$.get(apiUrl + '/applicants').then(function(response) {
		if ( response ) {
			renderApplicants(response);
		}
	});
}

function renderApplicants(applicants) {
	var $applicantTable = $('<table></table>');
	$.each(applicants, function(idx, applicant) {
		var newApplicant = renderApplicant(applicant);
		$applicantTable.append(newApplicant);
	})
	$(rootElement).empty().append($applicantTable);
}

function renderApplicant(applicant) {
	return $(['<tr>',
			'<td>' + applicant.applicant_s_last_name + '</td>',
			'<td>' + applicant.applicant_s_first_name + '</td>',
			'<td>' + applicant.job_status_descrp + '</td>',
		'</tr>'].join(''))
}