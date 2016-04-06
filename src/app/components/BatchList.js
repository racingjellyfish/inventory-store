/**
 * a simple batch list component
 */
'use strict';

import './ux/BatchList.less';

import BatchContainer from '../containers/Batch';
import { PropTypes } from 'react';
import React from 'react';
import { Record } from 'immutable';

export default class BatchList extends React.Component {
	render() {
		const batches = this.props.batches;
		return (
			<div>
				<div className='batchListHeader'>Batches</div>
				<ul className='batchList'>
					{batches.map((batch) =>
						<BatchContainer
							key={batch.get('id')}
							batch={batch}
							onClick={this.props.onBatchClick} />
					)}
				</ul>
			</div>
		);
	};
}

BatchList.propTypes = {
	batches: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Record)),
	onBatchClick: PropTypes.func.isRequired
};
