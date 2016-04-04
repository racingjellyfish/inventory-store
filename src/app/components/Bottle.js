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
		const { id, contents, status, onDelete, onDrink } = this.props;
		return (
			<li className='bottle'>
				<span className='contents'>
					contents: {contents}
				</span>
				{
					// TODO: check this is a sensible approach
					contents === 'empty' ?
						<span className='button disabled'>Drink</span>
					:
						<span className='button enabled'
							onClick={() => onDrink(id)}>Drink</span>
				}
				<span className='button' onClick={() => onDelete(id)}>Delete</span>
				<span className='status'>Status: {status}</span>
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
	status: PropTypes.string.isRequired,

	onDelete: PropTypes.func.isRequired,
	onDrink: PropTypes.func.isRequired
};
