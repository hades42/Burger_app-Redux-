import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../Components/Buger/Burger";
import BuildControl from "../../Components/Buger/BuildControl/BuildControl";
import Aux from "../../hoc/Aux";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSum from "../../Components/Buger/OrderSummary/OrderSum";
import Warning from "../../Components/Warning/Warning";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandle";
import * as burgerBuilderAction from "../../store/actions/index";



const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    resetable: false,
    reseting: false,
    loading: false,
  };

  componentDidMount() {
      this.props.onInitIngredients();
  }

  updatePurchaseState = (UpdatedIngredient) => {
    const copyIngredient = {
      ...UpdatedIngredient,
    };
    const sum = Object.entries(copyIngredient).reduce((sum, el) => {
      return sum + el[1] * INGREDIENT_PRICES[el[0]];
    }, 0);

    return sum >= 1.4;
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
//// Forward the user to auth if not authenticated
  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath("/checkout")
      this.props.history.push("/auth");
    }
  };
  cancelPurchase = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout",
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
      ...this.props.ings,
    };
    for (let key in copyIngredient) {
      copyIngredient[key] = copyIngredient[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Cannot load your order!</p>
    ) : (
      <Spinner></Spinner>
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredient={this.props.ings}></Burger>
          <BuildControl
            ingredient={this.state.ingredient}
            resetableFunc={this.updateAllowReset}
            updatePurchasable={this.updatePurchaseState}
            ingredientAdd={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            checkDisable={copyIngredient}
            totalPrice={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            purchasing={this.purchaseHandler}
            resetBurger={this.resetIngredient}
            resetable={this.state.resetable}
            reseting={this.resetHandler}
            isAuth = {this.props.isAuthenticated}
          ></BuildControl>
        </Aux>
      );
      orderSummary = (
        <OrderSum
          ingredients={this.props.ings}
          purchasedCancel={this.cancelPurchase}
          purchaseContinue={this.purchaseContinue}
          total={this.props.price}
        ></OrderSum>
      );

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

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredient,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.idToken !== null,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderAction.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderAction.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderAction.initIngredient()),
    onInitPurchase: () => dispatch(burgerBuilderAction.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(burgerBuilderAction.setAuthRedirectPath(path))

  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(WithErrorHandler(BurgerBuilder, axios));
