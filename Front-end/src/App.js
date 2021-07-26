import React,{useEffect,useState} from 'react'; // eslint-disable-line
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';

import Header from './components/header';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import My from './components/myList';
import Accommodation from './components/acco';
import Routr from './components/routr';
import Dash from './components/dashbord';
import Owner from './components/ownrAcc';
import Report from './components/ownrRep';
import Res from './components/ownrRes';
import Create from './components/Create';

import { setUser } from './store/actions/userAction';


function App(props) {
  return (
    
        <Router>
            <Header />
            
            <Route exact path= "/">
                <Home/>
            </Route>
            <Route exact path= "/routr">
                <Routr />
            </Route>
            <Route exact path= "/login">
                <Login />
            </Route>
            <Route exact path= "/signup">
                <SignUp />
            </Route>
            { props.user && Object.keys(props.user).length !== 0 ?
                <Switch>
                    <Route exact path= "/dashbord">
                        <Dash />
                    </Route>

                    <Route exact path= "/acco">
                        <Accommodation />
                    </Route>

                    <Route exact path= "/myList">
                        <My />
                    </Route>



                    <Route exact path= "/ownrAcc">
                        <Owner />
                    </Route>

                    <Route exact path= "/ownrRes">
                        <Res />
                    </Route>
{/* 
                    <Route exact path= "/ownrRep">
                        <Report />
                    </Route> */}

                    <Route exact path= "/ownrAcc/create">
                        <Create />
                    </Route>
                </Switch> : 
                <Redirect to={{pathname: '/login', state: {from: props.location}}} />
            }
        </Router>
  );
}

const stateToProps = state => ({
    ...state
})

export default connect(stateToProps,{setUser})(App);
