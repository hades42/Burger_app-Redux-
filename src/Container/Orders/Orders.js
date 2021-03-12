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
    // console.log(this.props.token);
    this.props.onFetchOrders(this.props.token);
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
    token: state.auth.idToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
