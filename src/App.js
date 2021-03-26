import Layout from "./Components/Layout/Layout";
import BurgerBuider from "./Container/BurgurBuilder/BurgerBuilder";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Logout from "./Container/Auth/Logout/Logout";
import { connect } from "react-redux";
import React, { Component } from "react";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckOut = asyncComponent(() => {
  return import('./Container/Checkout/Checkout');
});
const asyncOrder = asyncComponent(() => {
  return import('./Container/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./Container/Auth/auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}></Route>
        <Route path="/" exact component={BurgerBuider}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/checkout" component={asyncCheckOut}></Route>
          <Route path="/orders" component={asyncOrder}></Route>
          {/* Fixing the error of not being able to resever the information of burger component and redirect to the checkout page when the user signing in. Because we split the router into 2 stage and stage 2 doesnt have the auth component which help us to redirect to the checkout page. We need to add auth compenent into both stage of the routes. */}
          <Route path="/auth" component={asyncAuth}></Route>
          <Route path="/" exact component={BurgerBuider}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
