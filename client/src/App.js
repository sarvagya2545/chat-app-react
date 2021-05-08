import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { loadUser } from './redux/actions/authActions';
import store from './redux/store';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Loading from './components/utils/Loading'

const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const PasswordChange = lazy(() => import('./components/home/PasswordChange'));

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<Loading/>}>
          <Switch>
            <ProtectedRoute exact path="/chat" component={Chat}/>
            <Route exact path="/password_change/:id" component={PasswordChange}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
