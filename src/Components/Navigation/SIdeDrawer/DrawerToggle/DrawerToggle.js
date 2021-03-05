import React from "react";
import styles from "./DrawerToggle.module.css";

const Toggle = (props) => {
  return (
    <div className={styles.DrawerToggle} onClick={props.openedDrawer}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Toggle;
