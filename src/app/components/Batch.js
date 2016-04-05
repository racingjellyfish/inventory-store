/**
 * a simple batch component
 */
'use strict';

import './ux/Batch.less';

import { PropTypes } from 'react';
import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Batch extends React.Component {
	render() {
		const { id, name, count } = this.props;

		return (
			<li className='batch'>
				<span className='name'>
					{name}: {count}
				</span>
			</li>
		);
	};

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
}

Batch.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired
};
