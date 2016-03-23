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
		const { id, contents, onClick } = this.props;
		return (
			<li className='bottle'
					onClick={() => onClick(id)}>
				batch: {contents}
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
	onClick: PropTypes.func.isRequired
};
