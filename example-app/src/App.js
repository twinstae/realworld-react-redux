import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import agent from './agent';
import store from './redux/store';
import Header from './component/Header';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Article from './component/Article';
import { APP_LOAD, REDIRECT } from './constants/actionTypes';
import './App.css';
import Editor from './component/Editor';

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

function App({ redirectTo, onRedirect, appLoaded, onLoad}){
  useEffect(()=>{
    if (redirectTo) {
      console.log(redirectTo);
      store.dispatch(push(redirectTo));
      onRedirect();
    }
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
      console.log(token)
    }
    onLoad(token ? agent.Auth.current() : null, token);
  })
  
  if(redirectTo){
    return <div></div>;
  }

  const getRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} /> 
        <Route path="/register" component={Register}/>
        <Route path="/article/:id" component={Article} />
        <Route path="/editor/:slug" component={Editor} />
        <Route path="/editor/" component={Editor} />
      </Switch>
  )

  return (
    <BrowserRouter history={history}>
      <div>
        <Header />
        {appLoaded ? getRoutes(): null}
      </div>
    </BrowserRouter>        
  )
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);