/* app.js */

var apiUrl = '/api/';
var rootElement = '#appRoot';
var currentPage = 0;
var modalElem = null;

$(document).ready(function() {
	initApp();	
});

function initApp() {
	renderAppFrame();
	renderDropdowns();
	renderTable();
	renderButtons();
	renderModal();
	bindButtons();
	fetchApplicants();
}  

function renderDropdowns() {

}

function renderModal() {
	var $modal = $(renderTemplate('modal'));
	
	$('#modal-container').append($modal);
}

function renderTemplate(name, data) {
	if ( !data ) {
		data = {};
	}
	var templateFunc = Handlebars.compile(templates[name]);
	return templateFunc(data);
}

function renderAppFrame() {
	var appFrame = renderTemplate('appFrame');
	$(rootElement).html($(appFrame));
}

function renderButtons() {
	var $prevButton = $(renderTemplate('prevButton'));
	var $nextButton = $(renderTemplate('nextButton'));
	$("#buttons").empty()
		.append($prevButton)
		.append($nextButton);
}

function renderTable() {
	var tableHeaders = [
		{
			title: 'Name',
			sortBy: 'name'
		},
		{
			title: 'Job Status',
			sortBy: 'job_status_descrp'
		},
		{
			title: 'Latest Action',
			sortBy: 'latest_action_date'
		}
	];

	var $applicantTable = $(renderTemplate('contentTable'));
	var $tableHeader = $(renderTemplate('tableHead'));
	var $tableHeaderCells = $(renderTemplate('tableHeaderCells'));
	var $tableBody = $(renderTemplate('tableBody'));

	$.each(tableHeaders, function(idx, header) {
		var $newHeader = $(renderTemplate('tableHeaderCell', header));
		$tableHeaderCells.append($newHeader);
	});

	$tableHeader.append($tableHeaderCells);
	$applicantTable.append($tableHeader);	
	$applicantTable.append($tableBody);
	$("#content").empty()
		.append($applicantTable);
}

function fetchApplicants(pageNum) {
	if ( !pageNum ) {
		pageNum = 0;
	}

	var options = {
		pageNum: pageNum,
		sort: ''
	};

	$("#table-content").empty();

	$.get(apiUrl + '/applicants', options).then(function(response) {
		if ( response ) {
			renderApplicants(response.result);
			bindRowEvents();
			updateButtonState(pageNum, response.lastPage);
		}
	}).catch(function(err) {
		console.error('error loading applicants', err);
	});;
}

function updateButtonState(pageNum, lastPage) {
	var $prevButton = $('#previous-button');
	var $nextButton = $('#next-button');

	if ( lastPage ) {
		$nextButton.attr('disabled', true);
	} else {
		$nextButton.attr('disabled', false);
	}

	if ( pageNum === 0 ) {
		$prevButton.attr('disabled', true);
	} else {
		$prevButton.attr('disabled', false);
	}
	
}

function bindButtons() {
	$("#previous-button").click(handlePreviousButtonClick);
	$("#next-button").click(handleNextButtonClick);
}

function bindRowEvents() {
	$(".applicant-row").click(handleRowClick);
}

function handlePreviousButtonClick(e) {
	if ( !$(e.currentTarget).is(":disabled") ) {
		currentPage--;
		fetchApplicants(currentPage);		
	}
}

function handleNextButtonClick(e) {
	if ( !$(e.currentTarget).is(":disabled") ) {
		currentPage++;
		fetchApplicants(currentPage);
	}
}

function handleRowClick(e) {
	var id = $(e.currentTarget).data('id');
	showModal(id);
}

function showModal(applicantId) {
	$.get(apiUrl + '/applicant/' + applicantId).then(function(response) {
		var fullApplicant = renderTemplate('fullApplicant', {
			'applicant': response
		});	
		var content = renderTemplate('modalContent', {content: fullApplicant});
		$('#detail-modal').html($(content)).modal();
	}).catch(function(err) {
		console.error('error loading single applicant', err);
	});
}

function renderApplicants(applicants) {
	var $tableBody = $("#table-content");
	$tableBody.empty();
	$.each(applicants, function(idx, applicant) {
		var newApplicant = renderApplicant(applicant);
		$tableBody.append(newApplicant);
	});
}

function renderApplicant(applicant) {
	return renderTemplate('applicantRow', applicant);
}

/* Handlebars templates */

var templates = {
	appFrame: '<div id="content"></div><div id="buttons" class="button-container"></div><div id="modal-container"></div>',
	prevButton: '<button class="button primary" id="previous-button" disabled>Previous Page</button>',
	nextButton: '<button class="button primary" id="next-button" disabled>Next Page</button>',
	contentTable: '<table class="table"></table>',
	tableHead: '<thead></thead>',
	tableBody: '<tbody id="table-content" class="accordion" data-accordion></tbody>',
	tableHeaderCells: '<tr></tr>',
	tableHeaderCell: '<th class="sort-header data-sortBy="{{sortBy}}">{{title}}</th>',
	applicantRow: '<tr class="applicant-row" data-id="{{_id}}"><td>{{full_name}}</td><td>{{job_status_descrp}}</td><td>{{latest_action_date}}</td></tr>',
	modal: '<div id="detail-modal"></div>',
	modalContent: '<div class="modal-content">{{{content}}}<div><div class="modal-buttons"></div>',
	fullApplicant: '<h3>Viewing Client {{applicant.full_name}}</h3><table class="full-applicant"><tbody>{{#each applicant}}<tr><td>{{@key}}</td><td>{{this}}</td></tr>{{/each}}</tbody></table>'
};
