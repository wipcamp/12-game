import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginGame from './components/LineLogin/index';
import Liff from './components/LiffLogin/index';
import Lottie from './components/Animation/index';
import Profile from './components/Profile_Test/index';
// import Profile from './components/Profile/index'
import MiniGame2 from './components/MiniGame2/index'
import Map from './components/Map/index';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Route exact path='/map'>
            <Map />
          </Route>
          <Route exact path='/'>
            <Profile />
          </Route>
          <Route exact path='/MiniGame2'>
            <MiniGame2 />
          </Route>
        </Router>
      </header>
      {/* <Profile/ > */}
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
            </header> */}{' '}
    </div>
  );
}

export default App;
