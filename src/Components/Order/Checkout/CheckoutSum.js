import React from "react";
import Burger from "../../Buger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSum.module.css";
const CheckoutSum = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredient={props.ingredient}></Burger>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSum;
