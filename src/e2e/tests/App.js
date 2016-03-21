'use strict';

module.exports = {
	'Check for app-element': (browser) => {
		let home = browser.page.Home().navigate();

		home.expect.element('@appElement').to.be.present.before(1000);

		browser.end();
	}
};
