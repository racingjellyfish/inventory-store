'use strict';

module.exports = {
	'Check for root-element': browser => {
		let home = browser.page.Home().navigate();

		home.expect.element('@rootElement').to.be.present.before(1000);

		browser.end();
	},

	'Check for content': browser => {
		let home = browser.page.Home().navigate();

		home.expect.element('@contentElement').to.be.present.before(1000);
		home.expect.element('@contentElement').text.to.contain('some page content');

		browser.end();
	}
};
