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

class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.redirectTo) {
      console.log(this.props.redirectTo);
      store.dispatch(push(this.props.redirectTo));
      this.props.onRedirect();
    }
  }

  componentDidMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
      console.log(token)
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }
  
  render() {
    if(this.props.redirectTo){
      return <div></div>;
    }

    const Load = this.props.appLoaded ?
      (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} /> 
          <Route path="/register" component={Register}/>
          <Route path="/article/:id" component={Article} />
          <Route path="/editor/:slug" component={Editor} />
          <Route path="/editor/" component={Editor} />
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