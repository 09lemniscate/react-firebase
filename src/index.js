import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Spinner from "./Spinner";
import * as serviceWorker from "./serviceWorker";
import firebase from "./firebase";

import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setUser, clearUser } from "./actions";

const store = createStore(rootReducer, composeWithDevTools());

const Root = (props)=> {
  useEffect(()=>{
    firebase.isInitialized().then(user => {
      if (user) {
        props.setUser(user);
        props.history.push("/");
      } else {
        props.history.push("/login");
        props.clearUser();
      }
    });
  },[props.history,props.setUser,props.clearUser])


    return props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} props={props}/>
        <Route path="/login" component={Login} props={props}/>
      </Switch>
    );
  }

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser, clearUser }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
