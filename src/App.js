import React from 'react';
import Profile from './components/Profile/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginGame from './components/LineLogin/index';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <Switch>
        <Route exact path='/'>
          <LoginGame/>
        </Route>
        <Route exact path='/liffLogin'>
          <LoginGame/>
        </Route>
      </Switch>
    </Router>
      </header>
    </div>
  );
}

export default App;
