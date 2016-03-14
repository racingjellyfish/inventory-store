/**
 * a basic entrypoint for the app
 */
'use strict';

import './ux/App.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

ReactDOM.render(
	<Root />,
	document.getElementById('app')
);
