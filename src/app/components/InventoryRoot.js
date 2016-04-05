/**
 * a simple root component
 */
'use strict';

import './ux/InventoryRoot.less';

import { Link } from 'react-router';
import React from 'react';
import VisibleBottleList from '../containers/VisibleBottleList';

export default class InventoryRoot extends React.Component {
	render() {
		const isFetching = this.props.isFetching;
		if (isFetching) {
			return (
				<div className='inventoryRoot'>
					<div>loading...</div>
				</div>
			);
		} else {
			return (
				<div className='inventoryRoot'>
					<h1>Inventory</h1>
					<ul className="nav">
						<li><Link to="/batches">Batches</Link></li>
					</ul>
					<VisibleBottleList />
				</div>
			);
		}
	};
}
