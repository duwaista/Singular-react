import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { actions } from "./store/store";
import "./App.css";
import { firebase } from "./plugins/firebase";
import "./assets/styles/main.css";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import Loading from "./components/BasicComponents/LoadingBar/LoadingBarComponent";
import Login from "./pages/Auth/Login";
import Feed from "./pages/Feed";

const SignUp = React.lazy(() => import("./pages/Auth/Register"));
const About = React.lazy(() => import("./pages/About"));
const Profile = React.lazy(() => import("./pages/Profile"));

const App = (): JSX.Element => {
	const dispatch = useDispatch();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((currentUser) => {
			if (currentUser !== null) {
				dispatch(actions.User.authBuilder(currentUser));
				dispatch(actions.User.enterChanges(true));
			}
		});
	}, []);

	useEffect(() => {
		const width = window.innerWidth;
		if (width <= 700) {
			dispatch(actions.BoolShit.setMobile(true));
		} else {
			dispatch(actions.BoolShit.setMobile(false));
		}
	}, []);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path='/'>
						<HeaderComponent title='home' icon={true} />
						<Feed />
					</Route>
					<Suspense fallback={<Loading />}>
						<Route path='/sign-in' component={Login} />
						<Route path='/sign-up' component={SignUp} />
						<Route path='/about' component={About} />
						<Route path='/user/:id' component={Profile} />
					</Suspense>
				</Switch>
			</Router>
		</div>
	)
}

export default App;
