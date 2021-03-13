import Layout from "./Components/Layout/Layout";
import BurgerBuider from "./Container/BurgurBuilder/BurgerBuilder";
import Checkout from "./Container/Checkout/Checkout";
import Orders from "./Container/Orders/Orders";
import { Route, Switch } from "react-router-dom";
import Auth from "./Container/Auth/auth";
import Logout from "./Container/Auth/Logout/Logout";
import { connect } from "react-redux";
import React, {Component} from "react";
import * as actions from "./store/actions/index";
class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" component={Orders}></Route>
            <Route path="/" exact component={BurgerBuider}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default connect(null, mapDispatchToProps)(App);
