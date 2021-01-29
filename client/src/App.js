import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { loadUser } from './redux/actions/authActions';
import store from './redux/store';
import ProtectedRoute from './components/utils/ProtectedRoute';
import PasswordChange from './components/home/PasswordChange';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/chat" component={Chat}/>
          <Route exact path="/password_change/:id" component={PasswordChange}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
