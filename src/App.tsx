import React, { Suspense } from "react";
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import {FeedListComponent} from "./components/FeedListComponent/FeedListComponent";
import menu from './assets/icons/menu.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './assets/styles/main.css';
import './App.css';
const SignIn = React.lazy(() => import("./components/Auth/SignIn"));
const SignUp = React.lazy(() => import("./components/Auth/SignUp"));
const BottomMenuComponent = React.lazy( () => import("./components/BottomMenuComponent/BottomMenuComponent"));


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <div className="App">
                        <Suspense fallback={<div>
                            Загрузка...
                        </div>}>
                            <BottomMenuComponent/>
                        </Suspense>
                        <HeaderComponent title='Главная' icon={menu}/>
                        <FeedListComponent/>
                    </div>
                </Route>
                <Suspense fallback={<div>
                    Загрузка...
                </div>}>
                    <Route path='/sign-in' component={SignIn} />
                    <Route path='/sign-up' component={SignUp} />
                </Suspense>
            </Switch>
        </Router>
    );
}

export default App;
