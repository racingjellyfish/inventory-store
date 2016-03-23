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
		const { bottle, contents, onClick } = this.props;
		return (
			<li className='bottle'
					onClick={() => onClick(bottle.get('id'))}>
				batch: {contents}
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
