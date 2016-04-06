/**
 * top-level component
 */
'use strict';

import './ux/Inventory.less';

import FilteredBottleListContainer from '../containers/FilteredBottleList';
import NavLink from '../containers/NavLink';
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
						<li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
						<li><NavLink to="/batches">Batches</NavLink></li>
						<li><NavLink to="/bottles">Bottles</NavLink></li>
					</ul>
					{this.props.children}
				</div>
			);
		}
	};
}
