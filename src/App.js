import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginGame from './components/LineLogin/index'
import Liff from './components/LiffLogin/index'
import Lottie from './components/Animation/index'
import Profile from './components/Profile_Test/index'


function App() {
  return (
    <div className="App">
      <Profile/ >
      {/* <header className="App-header">
        <Router>
          <Switch>
            <Route exact path='/login'>
              <LoginGame />
            </Route>
            <Route exact path='/'>
              <Liff/>
            </Route>
          </Switch>
        </Router>
      </header> */}
    </div>
  );
}

export default App;