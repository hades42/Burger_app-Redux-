import React from "react";
import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";
import ToolBar from "../Navigation/ToolBar";
import SideDrawer from "../Navigation/SIdeDrawer/SideDrawer";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  closeDrawer = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  openDrawer = () => {
    this.setState((prevState, props) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });   
  };
  render() {
    return (
      <Aux name="Van Nguyen">
        <SideDrawer
          show={this.state.showSideDrawer}
          closed={this.closeDrawer}
        ></SideDrawer>
        <ToolBar openedDrawer={this.openDrawer}></ToolBar>
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
