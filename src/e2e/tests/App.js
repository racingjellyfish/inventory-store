'use strict';

module.exports = {
	'Check for app element': (browser) => {
		let home = browser.page.Home().navigate();

		home.expect.element('@appElement').to.be.present.before(1000);

		browser.end();
	},

	'Check first bottle element': (browser) => {
		let home = browser.page.Home().navigate();

		home.expect.element('@bottleElement').to.be.present.before(1000);
		home.expect.element('@bottleElement').text.to.contain('batch-0');

		browser.end();
	}
};
