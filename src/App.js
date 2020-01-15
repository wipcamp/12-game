import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LiffLogin from './components/LiffLogin/index';
import LoginGame from './components/LineLogin/index'
import Profile from './components/Profile/index'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <Switch>
        <Route exact path='/'>
          {/* <LoginGame /> */}
          <Profile/>
        </Route>
        <Route exact path='/liffLogin'>
          <LiffLogin />
        </Route>
      </Switch>
    </Router>
      </header>
    </div>
  );
}

export default App;
