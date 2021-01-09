import React from 'react';
import ReactDOM from 'react-dom';
import { Route} from 'react-router';

import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'
import { HashRouter } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route path="/" component={App}>
        <Route component ={Home} />
        <Route path="login" component={Login} />
      </Route>
    </HashRouter>
  </Provider>
  , document.getElementById('root')
);