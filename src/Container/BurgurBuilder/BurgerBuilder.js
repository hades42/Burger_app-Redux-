import React, { Component } from "react";

import Burger from "../../Components/Buger/Burger";
import BuildControl from "../../Components/Buger/BuildControl/BuildControl";
import Aux from "../../hoc/Aux";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSum from "../../Components/Buger/OrderSummary/OrderSum";
import Warning from "../../Components/Warning/Warning";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandle";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    resetable: false,
    reseting: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // console.log(this.props)
    axios
      .get("/orders.json")
      .then((res) => {
        this.setState({
          ingredient: res.data["-MRrv7K1z2ZXOVd_oDzI"].ingredient,
          totalPrice: res.data["-MRrv7K1z2ZXOVd_oDzI"].price
        });
      }).catch(err => {
        this.setState({
          error: true
        })
      });
  } 

  updatePurchaseState = (UpdatedIngredient) => {
    const copyIngredient = {
      ...UpdatedIngredient,
    };
    const sum = Object.entries(copyIngredient).reduce((sum, el) => {
      return sum + el[1] * INGREDIENT_PRICES[el[0]];
    }, 0);
    this.setState({
      purchasable: sum >= 1.8,
    });
  };

  updateAllowReset = (UpdatedIngredient) => {
    const copyIngredient = {
      ...UpdatedIngredient,
    };
    const amount = Object.entries(copyIngredient).reduce((sum, el) => {
      return sum + el[1];
    }, 0);
    this.setState({
      resetable: amount >= 1,
    });
  };

  addIngredient = (type) => {
    // Update the amount of ingredients
    const oldCount = this.state.ingredient[type];
    const updatedCount = oldCount + 1;
    const copyIngredients = {
      ...this.state.ingredient,
    };
    copyIngredients[type] = updatedCount;

    // Update the price of the burger
    const priceAddition = INGREDIENT_PRICES[type];
    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice + priceAddition;
    this.setState({
      ingredient: copyIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(copyIngredients);
    this.updateAllowReset(copyIngredients);
  };

  removeIngredient = (type) => {
    const oldCount = this.state.ingredient[type];
    if (oldCount > 0) {
      // Update the amount of ingredients
      const updatedCount = oldCount - 1;
      const copyIngredients = {
        ...this.state.ingredient,
      };
      copyIngredients[type] = updatedCount;

      // Update the total price
      const priceSubtraction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceSubtraction;
      this.setState({
        ingredient: copyIngredients,
        totalPrice: newPrice,
      });
      this.updatePurchaseState(copyIngredients);
      this.updateAllowReset(copyIngredients);
    }
  };

  resetIngredient = () => {
    this.setState({
      ingredient: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      resetable: false,
      resetting: false,
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  cancelPurchase = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {

    const queryParams = [];
    // console.log(this.state.ingredient);
    for(let [key,val] of Object.entries(this.state.ingredient)){
      queryParams.push(encodeURIComponent(key)+ "=" + encodeURIComponent(val));
    }
    // Becuase the INGREDIENT_PRICE is only available in the BurgerBuilder so we have to pass the value of the total price to the checkout component through out the query statement in the URL 
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  resetExecute = () => {
    this.resetIngredient();
    this.cancelReset();
  };
  cancelReset = () => {
    this.setState({ reseting: false });
  };
  resetHandler = () => {
    this.setState({
      reseting: true,
    });
  };

  render() {
    const copyIngredient = {
      ...this.state.ingredient,
    };
    for (let key in copyIngredient) {
      copyIngredient[key] = copyIngredient[key] <= 0;
    }

  
    
    let orderSummary =null;
    
    let burger = this.state.error ? <p>Cannot load your order!</p> : <Spinner></Spinner>
    if(this.state.ingredient){
      burger = (
        <Aux>
          <Burger ingredient={this.state.ingredient}></Burger>
          <BuildControl
            ingredient={this.state.ingredient}
            resetableFunc={this.updateAllowReset}
            updatePurchasable={this.updatePurchaseState}
            ingredientAdd={this.addIngredient}
            ingredientRemove={this.removeIngredient}
            checkDisable={copyIngredient}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchaseHandler}
            resetBurger={this.resetIngredient}
            resetable={this.state.resetable}
            reseting={this.resetHandler}
          ></BuildControl>
        </Aux>
      );
      orderSummary = (
        <OrderSum
          ingredients={this.state.ingredient}
          purchasedCancel={this.cancelPurchase}
          purchaseContinue={this.purchaseContinue}
          total={this.state.totalPrice}
        ></OrderSum>
      );

      if(this.state.loading){
        orderSummary = <Spinner></Spinner>
      }
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} hidden={this.cancelPurchase}>
          {orderSummary}
        </Modal>

        <Modal show={this.state.reseting} hidden={this.cancelReset}>
          <Warning
            messege="Are you sure?"
            resetCancel={this.cancelReset}
            resetExecute={this.resetExecute}
          ></Warning>
        </Modal>
          {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
