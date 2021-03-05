import React from "react";
import styles from "./Item.module.css";
import { NavLink } from "react-router-dom";

const ItemLink = (props) => {
  return (
    <li className={styles.Item}>
       {/* ActiveClassName will set the active css class for NavLink  */}
      <NavLink to={props.LinkTo} exact={props.exact} activeClassName={styles.active}>{props.children}</NavLink>
    </li>
  );
};

export default ItemLink;
