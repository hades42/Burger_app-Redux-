import React from "react";
import Logo from "../../Logo/Logo";
import NavItem from "../NavItem/NavItem";
import styles from "./SideDrawer.module.css";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../../hoc/Aux";
const SideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if(props.show){
        attachedClasses = [styles.SideDrawer, styles.Open];
    }
  return (
    <Aux>
      <BackDrop show={props.show} clicked={props.closed}></BackDrop>
      <div className={attachedClasses.join(" ")}>
        <div className={styles.Logo}>
          <Logo></Logo>
        </div>
        <nav>
          <NavItem></NavItem>
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
