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

		// TODO: some sort of generic button component?
		const drinkButton = contents === 'empty' ?
			<span className='button disabled'>Drink</span> :
			<span className='button enabled' onClick={() => onDrink(id)}>Drink</span>;

		// TODO: replace with spinner overlay?
		const statusUi = status !== 'OK' ?
			<span className='status'>Status: {status}</span> : undefined;

		return (
			<li className='bottle'>
				<span className='contents'>
					contents: {contents}
				</span>
				{drinkButton}
				<span className='button' onClick={() => onDelete(id)}>Delete</span>
				{statusUi}
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
