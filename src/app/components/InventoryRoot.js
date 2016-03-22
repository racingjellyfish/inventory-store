/**
 * a simple root component
 */
'use strict';

import './ux/InventoryRoot.less';

import BottleList from '../containers/BottleList';
import React from 'react';

export default class InventoryRoot extends React.Component {
	render() {
		return (
			<div className='inventoryRoot'>
				<BottleList />
			</div>
		);
	};
}
