/**
 * a simple bottle component
 */
'use strict';

import './ux/Bottle.less';

import { PropTypes } from 'react';
import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Bottle extends React.Component {
	render() {
		const { id, contents, onDelete, onDrink } = this.props;
		return (
			<li className='bottle'>
				<span className='contents'>
					contents: {contents}
				</span>
				<span className='button'
					onClick={() => onDrink(id)}>Drink</span>
				<span className='button'
					onClick={() => onDelete(id)}>Delete</span>
			</li>
		);
	};

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
}

Bottle.propTypes = {
	id: PropTypes.number.isRequired,
	contents: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired,
	onDrink: PropTypes.func.isRequired
};
