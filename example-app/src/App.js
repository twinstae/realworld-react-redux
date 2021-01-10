import React from 'react';
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

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) { agent.setToken(token); }
    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }
  render() {
    const Load = this.props.appLoaded ?
      (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} /> 
          <Route path="/register" component={Register}/>
          <Route path="/article/:id" component={Article} />
        </Switch>
      ) : null;

    return(
      <BrowserRouter>
        <div>
          <Header />
          {Load}
        </div>
      </BrowserRouter>        
    )
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);