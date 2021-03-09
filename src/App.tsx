import React from "react";
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import {FeedListComponent} from "./components/FeedListComponent/FeedListComponent";
import BottomMenuComponent from "./components/BottomMenuComponent/BottomMenuComponent";
import SignIn from "./components/Auth/SignIn";
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
                        <HeaderComponent title='Главная'/>
                        <BottomMenuComponent/>
                        <FeedListComponent/>
                    </div>
                </Route>
                <Route path='/sign-in' component={SignIn} />
            </Switch>
        </Router>
    );
}

export default App;
