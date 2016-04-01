/**
 * basic UTs for the root component
 */
'use strict';

import { createStore } from 'redux';
import expect from 'expect';
import Inventory from '../reducers/Inventory';
import InventoryContainer from './Inventory';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as ServerActions from '../actions/Server';
import TestUtils from 'react-addons-test-utils';

describe('InventoryContainer', () => {
	let inventoryContainer;
	let store;

	beforeEach(() => {
		store = createStore(Inventory);
		inventoryContainer = TestUtils.renderIntoDocument(<Provider store={store}><InventoryContainer /></Provider>);
	});

	it('renders without problems', () => {
		expect(inventoryContainer).toExist();
	});

	it('contains the expected text', () => {
		const rootContainer = ReactDOM.findDOMNode(inventoryContainer);

		expect(rootContainer).toExist();
		expect(rootContainer.firstChild.textContent).toBe('Bottles');
	});
});
