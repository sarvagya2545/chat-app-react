import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
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
          <Route path="/chat" component={Chat}/>
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
