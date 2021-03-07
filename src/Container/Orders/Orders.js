import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/spinner";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.props.onFetchOrders();
  }
  render() {
    let order = <Spinner></Spinner>;
    if (!this.props.loading) {
      order = (
        <div>
          {this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredient}
              price={order.price}
            ></Order>
          ))}
        </div>
      );
    }
    return order;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
