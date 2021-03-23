import React from "react";
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import {FeedListComponent} from "./components/FeedListComponent/FeedListComponent";
import BottomMenuComponent from "./components/BottomMenuComponent/BottomMenuComponent";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import menu from './assets/icons/menu.svg'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './assets/styles/main.css';
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <div className="App">
                        <HeaderComponent title='Главная' icon={menu}/>
                        <BottomMenuComponent/>
                        <FeedListComponent/>
                    </div>
                </Route>
                <Route path='/sign-in' component={SignIn} />
                <Route path='/sign-up' component={SignUp} />
            </Switch>
        </Router>
    );
}

export default App;
