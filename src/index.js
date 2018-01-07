import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo'
import reducers from './reducer';
import './config'
import AuthRoute from './component/authroute/authroute'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))

function Boss() {
  return <h2>Boss页面</h2>
}
function Genius() {
	return <h2>genius页面</h2>
}

ReactDom.render(
  <Provider store={store} >
	<BrowserRouter>
		<div>
			<AuthRoute></AuthRoute>
			<Switch>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/genius' component={Genius}></Route>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/boss' component={Boss}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
			</Switch>
		</div>
	</BrowserRouter>
  </Provider>,
	document.getElementById('root')
)
