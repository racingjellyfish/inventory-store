/**
 * app entrypoint
 */
'use strict';

import './ux/App.less';

import { createStore } from 'redux';
import Inventory from './reducers/Inventory';
import InventoryRoot from './components/InventoryRoot';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

let store = createStore(Inventory);

ReactDOM.render(
	<Provider store={store}>
		<InventoryRoot />
	</Provider>,
	document.getElementById('app')
);

// TEST CODE
import * as Batch from './actions/Batch';
import * as Bottle from './actions/Bottle';

// Log the initial state
console.log(JSON.stringify(store.getState()));

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() => {
	console.log(JSON.stringify(store.getState()));
});

// Dispatch some actions
store.dispatch(Bottle.addBottle(0));
store.dispatch(Bottle.addBottle(1));
store.dispatch(Bottle.addBottle(2));
store.dispatch(Bottle.addBottle(3));
store.dispatch(Bottle.removeBottle(1));
store.dispatch(Bottle.removeBottle(2));

store.dispatch(Batch.addBatch(0, 'beer0'));
store.dispatch(Batch.addBatch(1, 'beer1'));
store.dispatch(Bottle.fill(0, 0));
store.dispatch(Bottle.fill(3, 1));
store.dispatch(Bottle.drink(3));

// Stop listening to state updates
unsubscribe();
