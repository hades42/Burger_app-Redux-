import React from "react";

import styles from "./NavItem.module.css";
import Item from "../NavItem/Item/Item";
const NavItem = (props) => {
  console.log(props); 
  return (
    <ul className={styles.NavItem}>
      <Item LinkTo="/" exact>
        Burger Builder
      </Item>
      <Item LinkTo="/orders">Orders</Item>
      {!props.isAuthenticated ? 
        <Item LinkTo="/auth">Authentication</Item>
       : 
        <Item LinkTo="/logout">Logout</Item>
      }
    </ul>
  );
};

export default NavItem;
