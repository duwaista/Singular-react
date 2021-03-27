import React, {Suspense} from "react";
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
import Loading from "./components/BasicComponents/LoadingBar/LoadingBarComponent";

const SignIn = React.lazy(() => import("./components/Auth/SignIn"));
const SignUp = React.lazy(() => import("./components/Auth/SignUp"));
const BottomMenuComponent = React.lazy(() => import("./components/BottomMenuComponent/BottomMenuComponent"));

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <div className="App">
                        <Suspense fallback={<Loading />}>
                            <BottomMenuComponent/>
                        </Suspense>
                        <HeaderComponent title='Главная' icon={menu}/>
                        <Suspense fallback={<Loading/>}>
                            <FeedListComponent/>
                        </Suspense>
                    </div>
                </Route>
                <Suspense fallback={<Loading />}>
                    <Route path='/sign-in' component={SignIn}/>
                    <Route path='/sign-up' component={SignUp}/>
                </Suspense>
            </Switch>
        </Router>
    );
}

export default App;
