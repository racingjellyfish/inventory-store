/**
 * top-level component
 */
'use strict';

import './ux/Inventory.less';

import FilteredBottleListContainer from '../containers/FilteredBottleList';
import { Link } from 'react-router';
import React from 'react';

export default class InventoryRoot extends React.Component {
	render() {
		const isFetching = this.props.isFetching;
		if (isFetching) {
			return (
				<div className='inventory'>
					<div>loading...</div>
				</div>
			);
		} else {
			return (
				<div className='inventory'>
					<h1>Inventory</h1>
					<ul className="nav">
						<li><Link to="/batches">Batches</Link></li>
					</ul>
					<FilteredBottleListContainer />
				</div>
			);
		}
	};
}
