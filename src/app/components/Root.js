/**
 * a simple root component
 */
'use strict';

import './ux/Root.less';

import CheckboxWithLabel from './CheckboxWithLabel';
import React from 'react';

export default class Root extends React.Component {
	render() {
		return (
			<div className="root">
				<div className="content">some page content</div>
				<CheckboxWithLabel labelOn="On" labelOff="Off" />
			</div>
		);
	}
}
