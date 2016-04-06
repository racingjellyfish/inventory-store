/**
 * a simple batch component
 */
'use strict';

import './ux/Batch.less';

import { PropTypes } from 'react';
import React from 'react';
import { Record } from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';

export default class Batch extends React.Component {
	render() {
		const { batch, count } = this.props;
		const id = batch.get('id');
		const name = batch.get('name');

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
	batch: React.PropTypes.instanceOf(Record),
	count: PropTypes.number.isRequired
};
