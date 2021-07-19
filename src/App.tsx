import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import { FeedListComponent } from "./components/FeedListComponent/FeedListComponent";
import { firebase } from "./plugins/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/styles/main.css";
import "./App.css";
import Loading from "./components/BasicComponents/LoadingBar/LoadingBarComponent";
import Upload from "./components/UploadComponent/Upload";
import { actions } from "./store/store";

const SignIn = React.lazy(() => import("./components/Auth/SignIn"));
const SignUp = React.lazy(() => import("./components/Auth/SignUp"));
const BottomMenuComponent = React.lazy(() => import("./components/BottomMenuComponent/BottomMenuComponent"));
const About = React.lazy(() => import("./components/About/AboutComponent"));
const Profile = React.lazy(() => import("./components/ProfileComponent/Profile"));
const FullScreenDialog = React.lazy(() => import("./components/FullScreenPictureComponent/FullScreenDialog"));

function App(): JSX.Element {
	const dispatch = useDispatch();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((currentUser) => {
			if (currentUser !== null) {
				dispatch(actions.User.authBuilder(currentUser));
				dispatch(actions.User.enterChanges(true));
			}
		});
	}, [dispatch]);

	useEffect(() => {
		const width = window.innerWidth;
		if (width <= 700) {
			dispatch(actions.BoolShit.setMobile(true));
		} else {
			dispatch(actions.BoolShit.setMobile(false));
		}
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<div className='App'>
						<HeaderComponent title='home' icon={true} />
						<Suspense fallback={<Loading />}>
							<FullScreenDialog />
							<BottomMenuComponent />
							<Upload />
							<FeedListComponent />
						</Suspense>
					</div>
				</Route>
				<Suspense fallback={<Loading />}>
					<Route path='/sign-in' component={SignIn} />
					<Route path='/sign-up' component={SignUp} />
					<Route path='/about' component={About} />
					<Route path='/user/:id' component={FullScreenDialog} />
					<Route path='/user/:id' component={Profile} />
					<Route path='/user/:id' component={BottomMenuComponent} />
				</Suspense>
			</Switch>
		</Router>
	);
}

export default App;
