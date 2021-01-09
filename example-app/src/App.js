import React from 'react';
import {connect} from 'react-redux';
import Header from './component/Header';
import Home from './component/Home';
const mapStateToProps = state => ({
  appName: state.appName
});

class App extends React.Component {
    render() {
      return (
        <div>
          <Header appName={this.props.appName} />
          <Home />
        </div>
    );
  }
}

export default connect(mapStateToProps)(App);
