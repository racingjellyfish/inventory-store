/**
 * app entrypoint
 */
'use strict';

// ensure relevant polyfills are loaded before other code runs
import 'babel-polyfill';

import './ux/App.less';

import createLogger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import Inventory from './reducers/Inventory';
import InventoryContainer from './containers/Inventory';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as ServerActions from './actions/Server';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger();

let store = createStore(Inventory, applyMiddleware(
	thunkMiddleware, loggerMiddleware
));

import * as Batch from './actions/Batch';
import * as Bottle from './actions/Bottle';

ReactDOM.render(
	<Provider store={store}>
		<InventoryContainer />
	</Provider>,
	document.getElementById('app')
);

store.dispatch(ServerActions.fetchDataIfNeeded()).then(() => {
	// TEST CODE
	console.log(store.getState());

	store.dispatch(Bottle.removeBottle(1));
	store.dispatch(Bottle.removeBottle(2));

	store.dispatch(Bottle.fill(0, 0));
	store.dispatch(Bottle.fill(3, 1));
	store.dispatch(Bottle.drink(4));
});

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() => {
	console.log(JSON.stringify(store.getState()));
});

// Stop listening to state updates
// unsubscribe();
