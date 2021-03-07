import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/Checkout/CheckoutSum";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      let purchasedRedirect = this.props.purchased ? <Redirect to ="/"></Redirect> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredient={this.props.ings}
            checkoutCancelled={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          ></CheckoutSummary>
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          ></Route>
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredient,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};



export default connect(mapStateToProps )(Checkout);
