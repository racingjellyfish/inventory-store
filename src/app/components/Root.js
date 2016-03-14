/**
 * a simple root component
 */
'use strict';

import './ux/Root.less';

import React from 'react';

export default class Root extends React.Component {
	render() {
		return (
			<div className="root">
				<div>root-element</div>
			</div>
		);
	}
}
