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
		const bottle = this.props.bottle.toObject();
		return (
			<li className='bottle'
					key={bottle.id}
					onClick={() => this.props.onClick(bottle.id)}>
				batch: {bottle.batchId === undefined ? 'empty' : bottle.batchId}
			</li>
		);
	};

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	};
}

Bottle.propTypes = {
	bottle: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired
};
