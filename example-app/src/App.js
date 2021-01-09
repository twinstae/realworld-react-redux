import React from 'react';
import store from './redux/store'

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    store.subscribe(() => this.setState(store.getState()));
  }


  render() {
    const onClick = () => store.dispatch({ type: 'TOGGLE' });
    return (
        <div>
            <h1>To-dos</h1>
            <div>
            Learn Redux&nbsp;
            <input
                type="checkbox"
                checked={!!this.state.checked} 
                onClick={onClick}
            />
            </div>
            {
            this.state.checked ? (<h2>Done!</h2>) : null
            }
        </div>
        );
   }
};

export default App;
