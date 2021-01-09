import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from './component/Header';
import Home from './component/Home';
import Login from './component/Login';
import './App.css';

const mapStateToProps = state => ({
  appName: state.appName
});

class App extends React.Component {
    render() {
      return (
        <BrowserRouter>
          <div>
            <Header appName={this.props.appName} />
            <Switch>
              <Route path="/login" component={Login} /> 
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </BrowserRouter>        
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(App);