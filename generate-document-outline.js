(function (factory) {
	'use strict';

	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory(require('jquery'));
	}
	else {
		factory(jQuery);
	}
})(function ($) {
	'use strict';

	$.fn.generateDocumentOutline = function (where) {
		// Generates the outline
		var generateOutline = function (headings) {
			var html = '<ul>';

			headings.each(function (i) {
				var heading = $(this);
				var currLevel = heading[0].nodeName.substr(1);
				var name = heading.text().replace(/ /g, '-').toLowerCase();

				heading.attr('id', 'jquery-generate-document-outline-' + name + '-'  + currLevel + '-' + i);

				html += '<li><a href="#jquery-generate-document-outline-' + name + '-'  + currLevel + '-' + i + '">' + heading.text() + '</a>';

				var nextHeadings = heading.nextUntil('h' + currLevel, 'h' + (parseInt(currLevel, 10) + 1));

				if (nextHeadings.length) {
					html += generateOutline(nextHeadings);
				}

				html += '</li>';
			});

			html += '</ul>';

			return html;
		};

		return this.each(function () {
			var doc = $(this);

			$(where).append(generateOutline(doc.find(doc.find(':header')[0].nodeName)));
		});
	};
});
