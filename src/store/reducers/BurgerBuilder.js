import * as actionType from "../actions/actionType";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
const initialState = {
  ingredient: null, 
  totalPrice: 4,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.ingredientName]: state.ingredient[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.ingredientName]: state.ingredient[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
      case actionType.SET_INGREDIENT:
        return{
          ...state,
          ingredient: action.ingredients,
          totalPrice: 4,
          error: false
        }
      case actionType.FETCH_FAILED:
        return{
          ...state,
          error: true
        }
    default:
      return state;
  }
};

export default reducer;
