import React from "react";
import {withRouter} from "react-router-dom";
import styles from "./Burger.module.css";
import BurgerIngredient from "./Ingredients/Ingredient";
 
let hashCode = (s)=> {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};
const burger = (props) => {
  // console.log(props)
  let arr = [];
  Object.entries(props.ingredient).forEach(
    (ingredient, index) => {
      for (let i = 0; i < ingredient[1]; i++) {
        let key = ingredient[0] + i;
        arr.push(
          <BurgerIngredient
            key={hashCode(key)}
            type={ingredient[0]}
          ></BurgerIngredient>
        );
      }
    }
  );
  if(arr.length === 0){
      arr = [<p key="Adding">Please start adding ingredient</p>]
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {[...arr]}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default withRouter(burger);
