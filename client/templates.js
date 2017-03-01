/* Handlebars templates */

var templates = {
	appFrame: '<div id="search"></div><div id="sort"></div><div id="content"></div><div id="buttons" class="button-container"></div><div id="modal-container"></div>',
	prevButton: '<button class="button primary" id="previous-button" disabled>Previous Page</button>',
	nextButton: '<button class="button primary" id="next-button" disabled>Next Page</button>',
	contentTable: '<table class="table"></table>',
	//tableHead: '<thead><tr>{{#each headers}}<th class="sort-header data-sortBy="{{sortBy}}">{{title}}</th>{{/each}}</tr></thead>',
	tableHead: '<thead><tr>{{#each headers}}<th class="sort-header data-sortBy="{{@key}}">{{this}}</th>{{/each}}</tr></thead>',
	tableBody: '<tbody id="table-content"></tbody>',
	//applicantRow: '<tr class="applicant-row" data-id="{{_id}}"><td>{{full_name}}</td><td>{{job_status_descrp}}</td><td>{{latest_action_date}}</td></tr>',
	applicantRow: '<tr class="applicant-row" data-id="{{id}}">{{#each fields}}<td>{{this}} &nbsp;</td>{{/each}}</tr>',
	modal: '<div id="detail-modal"></div>',
	modalContent: '<div class="modal-content">{{{content}}}<div><div class="modal-buttons"></div>',
	fullApplicant: '<h3>Viewing Applicant {{applicant.full_name}}</h3><table class="full-applicant"><tbody>{{#each applicant}}<tr><td>{{@key}}</td><td>{{this}}</td></tr>{{/each}}</tbody></table>',
	search: '<div class="search-bar"><input type="text" id="search-input" class="search-input" placeholder="Search..."/>' + 
		'<span class="search-term-block"><label>Search Field</label><select id="search-field" class="search-field">{{#each searchFields}}<option value={{this}}>{{this}}</option>{{/each}}</select></span>' + 
		'</div>',
	sort: '<div class="sort-bar"><span class="sort-field-block"><label>Sort By</label><select id="sort-field" class="sort-field"><option value="">Select...</option>{{#each sortFields}}<option value={{this}}>{{this}}</option>{{/each}}</select></span></div>'
};
