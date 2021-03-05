import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/Checkout/CheckoutSum";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice : 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let [key, value] of query.entries()) {
      if (key === "price") {
        price = value;
      } else {
        ingredients[key] = value;
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }
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
          ingredient={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData ingredients={this.state.ingredients}  price = {this.state.totalPrice}></ContactData>
          )}
        ></Route>
      </div>
    );
  }
}

export default Checkout;
