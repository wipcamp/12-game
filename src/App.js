import React from 'react';
import Profile from './components/Profile/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginGame from './LoginGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <Switch>
        <Route exact path='/'>
          <Profile/>
        </Route>
        <Route exact path='/login'>
          <LoginGame/>
        </Route>
      </Switch>
    </Router>
      </header>
    </div>
  );
}

export default App;
