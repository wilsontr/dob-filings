/* app.js */

var globals = {
	apiUrl: '/api/',
	rootElement: '#appRoot',
	currentPage: 0,
	searchTerm: '',
	searchField: '',
	sortField: ''
};

var displayFields = {
	'applicant_s_last_name': 'Applicant\'s Last Name', 
	'applicant_s_first_name': 'Applicant\'s First Name', 
	'borough' : 'Borough',
	'building_type': 'Building Type', 
	'city_': 'City',
	'state': 'State',
	'job_status': 'Job Status',
	'job_status_descrp': 'Job Status Description',
	'job_type': 'Job Type',
	'owner_s_business_name': 'Owner\'s Business Name',
	'owner_s_last_name': 'Owner\'s Last Name',
	'owner_s_first_name': 'Owner\'s First Name',
	'proposed_height': 'Proposed Height',
	'proposed_no_of_stories': 'Proposed Stories',
	'total_est__fee': 'Total Est Fee',
	'street_name': 'Street Name'
};

$(document).ready(function() {
	initApp();	
});

function initApp() {
	renderAppFrame();
	renderTopUI();
	renderButtons();
	renderModal();
	fetchApplicants();
}  

function renderTopUI() {
	$.get(globals.apiUrl + '/applicant/fields')
		.then(function(fields) {
			renderSearch(fields);
			renderSort(fields);
			renderTable(fields);
			bindEvents();
		})
		.catch(function(err) {
			console.error('error rendering search field', err);
		});
}

function renderSearch(searchFields) {
	var $search = $(renderTemplate('search', {searchFields: searchFields}));
	$('#search').append($search);
	globals.searchField = searchFields[0];
}

function renderSort(sortFields) {
	var $sort = $(renderTemplate('sort', {sortFields: sortFields}));
	$('#sort').append($sort);
	globals.sortField = sortFields[0];
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
	$(globals.rootElement).html($(appFrame));
}

function renderButtons() {
	var $prevButton = $(renderTemplate('prevButton'));
	var $nextButton = $(renderTemplate('nextButton'));
	$("#buttons").empty()
		.append($prevButton)
		.append($nextButton);
}

function renderTable() {

	var tableHeaders = displayFields;

	var $applicantTable = $(renderTemplate('contentTable'));
	var $tableHeader = $(renderTemplate('tableHead', {headers: tableHeaders}));
	var $tableBody = $(renderTemplate('tableBody'));

	$applicantTable.append($tableHeader);	
	$applicantTable.append($tableBody);
	$("#content").empty()
		.append($applicantTable);
}

function fetchApplicants() {

	var options = {
		pageNum: globals.currentPage,
		searchTerm: globals.searchTerm,
		searchField: globals.searchField,
		sortField: globals.sortField
	};

	$.get(globals.apiUrl + '/applicants', options).then(function(response) {
		if ( response ) {
			renderApplicants(response.result);
			bindRowEvents();
			updateButtonState(globals.currentPage, response.lastPage);
		}
	}).catch(function(err) {
		console.error('error loading applicants', err);
	});
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

function bindEvents() {
	$("#previous-button").click(handlePreviousButtonClick);
	$("#next-button").click(handleNextButtonClick);
	$("#search-input").keyup(handleSearchChange);
	$("#search-field").change(_.throttle(handleSearchChange, 50));
	$("#sort-field").change(handleSortChange);
}

function bindRowEvents() {
	$(".applicant-row").click(handleRowClick);
}

function handlePreviousButtonClick(e) {
	if ( !$(e.currentTarget).is(":disabled") ) {
		globals.currentPage--;
		fetchApplicants(globals.currentPage);		
	}
}

function handleNextButtonClick(e) {
	if ( !$(e.currentTarget).is(":disabled") ) {
		globals.currentPage++;
		fetchApplicants();
	}
}

function handleRowClick(e) {
	var id = $(e.currentTarget).data('id');
	showModal(id);
}

function handleSearchChange(e) {
	var $searchInput = $('#search-input');
	var $searchField = $('#search-field');
	globals.searchTerm = $searchInput.val();
	globals.searchField = $searchField.val();
	fetchApplicants();	
}

function handleSortChange(e) {
	globals.sortField = $('#sort-field').val();
	fetchApplicants();
}

function showModal(applicantId) {
	$.get(globals.apiUrl + '/applicant/' + applicantId).then(function(response) {
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

function filterFields(row) {
	return _.pick(row, _.keys(displayFields));
}

function renderApplicant(applicant) {
	var renderObject = filterFields(applicant);
	return renderTemplate('applicantRow', {fields: renderObject, id: applicant._id});
}
