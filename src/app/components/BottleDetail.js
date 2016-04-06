/**
 * a simple bottle detail component
 */
'use strict';

import './ux/Bottle.less';

import { PropTypes } from 'react';
import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class BottleDetail extends React.Component {
	render() {
		if (this.props.isFetching) {
			return (
				<div className='bottle'>
					<div>loading...</div>
				</div>
			);
		} else if (this.props.status === 'UNKNOWN') {
			return (
				<div className='bottle'>
					<div>Unknown bottle id: {this.props.id}</div>
				</div>
			);
		} else {
			const { id, contents, type, volume, onDelete, onDrink } = this.props;

			// TODO: some sort of generic button component?
			const drinkButton = contents === 'empty' ?
				<span className='button disabled'>Drink</span> :
				<span className='button enabled' onClick={() => onDrink(id)}>Drink</span>;

			// TODO: replace with spinner overlay?
			const statusUi = status !== 'OK' ?
				<span className='status'>Status: {status}</span> : undefined;

			return (
				<div className='bottle'>
					<span className='type'>
						type: {type}
					</span>
					<span className='volume'>
						volume: {volume}
					</span>
					<span className='contents'>
						contents: {contents}
					</span>
					{drinkButton}
					<span className='button' onClick={() => onDelete(id)}>Delete</span>
					{statusUi}
				</div>
			);
		}
	};

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
}

BottleDetail.propTypes = {
	id: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,

	onDelete: PropTypes.func.isRequired,
	onDrink: PropTypes.func.isRequired
};
