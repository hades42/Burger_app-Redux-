import Layout from "./Components/Layout/Layout";
import BurgerBuider from "./Container/BurgurBuilder/BurgerBuilder";
import Checkout from "./Container/Checkout/Checkout";
import Orders from "./Container/Orders/Orders";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Auth from "./Container/Auth/auth";
import Logout from "./Container/Auth/Logout/Logout";
import { connect } from "react-redux";
import React, { Component } from "react";
import * as actions from "./store/actions/index";
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuider}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          {/* Fixing the error of not being able to resever the information of burger component and redirect to the checkout page when the user signing in. Because we split the router into 2 stage and stage 2 doesnt have the auth component which help us to redirect to the checkout page. We need to add auth compenent into both stage of the routes. */}
          <Route path="/auth" component={Auth}></Route>
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
