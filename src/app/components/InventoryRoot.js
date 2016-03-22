/**
 * a simple root component
 */
'use strict';

import './ux/InventoryRoot.less';

import React from 'react';
import VisibleBottleList from '../containers/VisibleBottleList';

export default class InventoryRoot extends React.Component {
	render() {
		return (
			<div className='inventoryRoot'>
				<VisibleBottleList />
			</div>
		);
	};
}
