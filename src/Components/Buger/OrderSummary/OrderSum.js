import React from "react";
import Aux from "../../../hoc/Aux";
import Btn from "../../UI/Button/Button";

class OrderSummary extends React.Component {

  componentDidUpdate(){
    // console.log("Component Did update")
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey} </span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order:</h3>
        <p>A burger with following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          Total Price: $<strong>{this.props.total.toFixed(2)} </strong>
        </p>
        <p>Continue to checkout</p>
        <Btn clicked={this.props.purchasedCancel} btnType="Danger">
          CANCEL
        </Btn>
        <Btn clicked={this.props.purchaseContinue} btnType="Success">
          CONTINUE
        </Btn>
      </Aux>
    );
  }
}



export default OrderSummary;
