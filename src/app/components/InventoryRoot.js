/**
 * a simple root component
 */
'use strict';

import './ux/Root.less';

import BottleList from '../containers/BottleList';
import React from 'react';

export default class InventoryRoot extends React.Component {
	render() {
		return (
			<div>
				<BottleList />
			</div>
		);
	};
}
