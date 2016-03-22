/**
 * a simple bottle list component
 */
'use strict';

import './ux/BottleList.less';

import Bottle from './Bottle';
import { PropTypes } from 'react';
import React from 'react';

export default class BottleList extends React.Component {
	render() {
		const bottles = this.props.bottles;
		return (
			<div>
				<div className='bottleListHeader'>Bottles</div>
				<ul className='bottleList'>
					{bottles.map((bottle) =>
						<Bottle bottle={bottle} onClick={this.props.onBottleClick} />
					)}
				</ul>
			</div>
		);
	};
}

BottleList.propTypes = {
	bottles: PropTypes.object.isRequired,
	onBottleClick: PropTypes.func.isRequired
};
