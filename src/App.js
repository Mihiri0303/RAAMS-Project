import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import My from './components/myList';
import Accommodation from './components/acco';
import Routr from './components/routr';


function App() {
  return (
   <>
   <Router>
      <Header />
    
      <Route exact path= "/">
      <Home/>
      {/* <Destinations/> */}
      </Route>
      <Route path= "/routr">
          <Routr />
      </Route>

      <Route path= "/acco">
          <Accommodation />
      </Route>

      <Route path= "/myList">
          <My />
      </Route>

      <Route path= "/login">
          <Login />
      </Route>

      <Route path= "/signup">
          <SignUp />
      </Route>

   </Router>
   </>
  );
}

export default App;
