/* Handlebars templates */

var templates = {
	appFrame: '<div id="search"></div><div id="content"></div><div id="buttons" class="button-container"></div><div id="modal-container"></div>',
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
	fullApplicant: '<h3>Viewing Applicant {{applicant.full_name}}</h3><table class="full-applicant"><tbody>{{#each applicant}}<tr><td>{{@key}}</td><td>{{this}}</td></tr>{{/each}}</tbody></table>',
	search: '<div class="search-bar"><input type="text" id="search-input" class="search-input" placeholder="Search..."/>' + 
		'<span class="search-term-block"><label>Search Field</label><select id="search-field" class="search-field">{{#each searchFields}}<option value={{this}}>{{this}}</option>{{/each}}</select></span>' + 
		'</div>'
};
