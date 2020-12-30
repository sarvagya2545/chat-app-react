import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import { loadUser } from './redux/actions/authActions';
import store from './redux/store';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
