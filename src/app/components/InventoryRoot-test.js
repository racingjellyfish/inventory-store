/**
 * basic UTs for the root component
 */
'use strict';

import { createStore } from 'redux';
import expect from 'expect';
import Inventory from '../reducers/Inventory';
import InventoryRoot from './InventoryRoot';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


describe('InventoryRoot', () => {
	let inventoryRoot;
	let store;

	beforeEach(() => {
		store = createStore(Inventory);
		inventoryRoot = TestUtils.renderIntoDocument(<Provider store={store}><InventoryRoot /></Provider>);
	});

	it('renders without problems', () => {
		expect(inventoryRoot).toExist();
	});

	it('contains the expected text', () => {
		const rootNode = ReactDOM.findDOMNode(inventoryRoot);

		expect(rootNode).toExist();
		expect(rootNode.firstChild.textContent).toBe('TODO: add UI');
	});
});
