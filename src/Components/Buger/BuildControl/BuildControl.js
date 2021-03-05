import React from "react";
import styles from "./BuilldControl.module.css";
import Control from "./Control/Cotrol";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

class BuildControls extends React.Component {


  componentDidMount(){
    this.props.updatePurchasable(this.props.ingredient);
    this.props.resetableFunc(this.props.ingredient);
  }

  render() {
    return (
      <div className={styles.BuildControls}>
        <p>
          Current Price: <strong>{this.props.totalPrice.toFixed(2)}</strong>
        </p>
        {controls.map((ctrl) => {
          return (
            <Control
              key={ctrl.label}
              label={ctrl.label}
              addIngredient={() => this.props.ingredientAdd(ctrl.type)}
              removeIngredient={() => this.props.ingredientRemove(ctrl.type)}
              allowDisable={this.props.checkDisable[ctrl.type]}
            ></Control>
          );
        })}
        <button
          className={styles.ResetBtn}
          disabled={!this.props.resetable}
          onClick={this.props.reseting}
        >
          Reset Burger
        </button>
        <button
          className={styles.OrderButton}
          disabled={!this.props.purchasable}
          onClick={this.props.purchasing}
        >
          ORDER NOW
        </button>
      </div>
    );
  }
}

export default BuildControls;
