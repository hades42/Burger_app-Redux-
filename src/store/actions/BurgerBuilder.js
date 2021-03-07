import * as actionTypes from "./actionType";
import axios from "../../axios-orders";
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};
export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  };
};
export const fetchFailed = () => {
    return {
        type: actionTypes.FETCH_FAILED
    }
}
export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get("https://hamburger-764ca-default-rtdb.firebaseio.com/ingredients.json")
      .then((res) => {
        dispatch(setIngredient(res.data));
      })
      .catch((err) => {
        dispatch(fetchFailed());
      });
  };
};
