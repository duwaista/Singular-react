import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import { actions } from "./store/store";
import { firebase } from "./plugins/firebase";
import "./assets/styles/main.css";
import HeaderComponent from "./components/HeaderComponent";
import Loading from "./common/LoadingBar";
import Login from "./pages/Auth/Login";
import Feed from "./pages/Feed";
import useAppDispatch from "./hooks/useAppDispatch";
import { setUserIsLogged, updateUserInfo } from "./store/user";
import useAppSelector from "./hooks/useAppSelector";

const SignUp = React.lazy(() => import("./pages/Auth/Register"));
const About = React.lazy(() => import("./pages/About"));
const Profile = React.lazy(() => import("./pages/Profile"));

const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthFail, setIsAuthFail] = useState(false);

  const isLogged = useAppSelector((state) => state.user.isLogged);

  const dispatch = useAppDispatch();

  const checkCurrentUser = () => {
    console.log("Check")
    try {
      firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser) {
          // All fields will break rtk :)
          const { email, uid, photoURL } = currentUser;
          dispatch(updateUserInfo({ email, uid, photoURL }));
          // Nvm...
          dispatch(setUserIsLogged(true));
          setIsLoading(false);
        } else setIsAuthFail(true);
      });
    } catch (e) {
      setIsAuthFail(true);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLogged) checkCurrentUser();
    else if (isAuthFail) setIsAuthFail(false);
  }, [isLogged, isAuthFail]);

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
        {!isLoading && !isAuthFail && isLogged && (
          <Switch>
            <Route exact path="/">
              <HeaderComponent title="home" showDrawer />
              <Feed />
            </Route>
            <Suspense fallback={<Loading />}>
              <Route path="/about" component={About} />
              <Route path="/user/:id" component={Profile} />
            </Suspense>
          </Switch>
        )}
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Suspense>
        </Switch>
        {!isLoading && isAuthFail && <Redirect to="/sign-in" />}
      </Router>
    </div>
  );
};

export default App;
