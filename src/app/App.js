/**
 * app entrypoint
 */
'use strict';

import './ux/App.less';

import Inventory from './reducers/Inventory';
import InventoryRoot from './components/InventoryRoot';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Redux from 'redux';

let store = Redux.createStore(Inventory);

ReactDOM.render(
	<Provider store={store}>
		<InventoryRoot />
	</Provider>,
	document.getElementById('app')
);
