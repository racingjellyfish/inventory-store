/**
 * app entrypoint
 */
'use strict';

// ensure relevant polyfills are loaded before other code runs
import 'babel-polyfill';

import './ux/App.less';

import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import FilteredBatchListContainer from './containers/FilteredBatchList';
import Inventory from './reducers/Inventory';
import InventoryContainer from './containers/Inventory';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import * as ServerActions from './actions/Server';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger();

let store = createStore(Inventory, applyMiddleware(
	thunkMiddleware, loggerMiddleware
));

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={InventoryContainer} />
			<Route path="/batches" component={FilteredBatchListContainer} />
		</Router>
	</Provider>,
	document.getElementById('app')
);

import * as Batch from './actions/Batch';
import * as Bottle from './actions/Bottle';

store.dispatch(ServerActions.fetchDataIfNeeded()).then(() => {
	// TEST CODE
	console.log(store.getState());

	store.dispatch(Bottle.fill(0, 0));
	store.dispatch(Bottle.fill(3, 1));
});

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() => {
	console.log(JSON.stringify(store.getState()));
});

// Stop listening to state updates
// unsubscribe();
