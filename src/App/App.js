import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import './App.scss';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import NewBoard from '../components/pages/NewBoard/NewBoard';
import SingleBoard from '../components/pages/SingleBoard/SingleBoard';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: true,
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
            <PrivateRoute path="/" exact component={Home} authed={authed} />
            <PrivateRoute path="/board/new" exact component={NewBoard} authed={authed} />
            <PublicRoute path="/auth" exact component={Auth} authed={authed} />
            <PrivateRoute path="/board/:boardId" exact component={SingleBoard} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
