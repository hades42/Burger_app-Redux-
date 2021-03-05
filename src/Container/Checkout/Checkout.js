import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/Checkout/CheckoutSum";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
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
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredient,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
