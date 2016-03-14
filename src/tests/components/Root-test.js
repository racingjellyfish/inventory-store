/**
 * basic UTs for the root component
 */
'use strict';

import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/components/Root';
import TestUtils from 'react-addons-test-utils';

describe('Root', () => {
	let root;

	beforeEach(() => {
		root = TestUtils.renderIntoDocument(<Root/>);
	});

	it('renders without problems', () => {
		expect(root).toExist();
	});

	it('contains the expected text', () => {
		const rootNode = ReactDOM.findDOMNode(root);

		expect(rootNode).toExist();
		expect(rootNode.firstChild.textContent).toBe('root-element');
	});
});
