import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LiffLogin from './components/LiffLogin/index';
import LoginGame from './components/LineLogin/index'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path='/login'>
              <LoginGame />
            </Route>
            <Route exact path='/'>
              <LoginGame />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;