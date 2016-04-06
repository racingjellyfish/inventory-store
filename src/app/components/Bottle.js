/**
 * a simple bottle overview component
 */
'use strict';

import './ux/Bottle.less';

import { Link } from 'react-router';
import { PropTypes } from 'react';
import React from 'react';
import { Record } from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';

export default class Bottle extends React.Component {
	render() {
		const { bottle, contents, onDelete, onDrink } = this.props;
		const id = bottle.get('id');
		const status = bottle.get('status');

		// TODO: some sort of generic button component?
		const drinkButton = contents === 'empty' ?
			<span className='button disabled'>Drink</span> :
			<span className='button enabled' onClick={() => onDrink(id)}>Drink</span>;

		// TODO: replace with spinner overlay?
		const statusUi = status !== 'OK' ?
			<span className='status'>Status: {status}</span> : undefined;

		return (
			<li className='bottle'>
				<span><Link to={'/bottles/' + id}>{id}</Link></span>
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
	bottle: React.PropTypes.instanceOf(Record),
	contents: PropTypes.string.isRequired,

	onDelete: PropTypes.func.isRequired,
	onDrink: PropTypes.func.isRequired
};
