import React from "react";
import styles from "./ToolBar.module.css"
import Logo from "../Logo/Logo"
import NavItem from "../Navigation/NavItem/NavItem"
import DrawerToggle from "../Navigation/SIdeDrawer/DrawerToggle/DrawerToggle"

const ToolBar = (props) => {
    return (
      <header className={styles.ToolBar}>
        <DrawerToggle openedDrawer={props.openedDrawer}></DrawerToggle>
        <Logo></Logo>
        <div className={styles.DesktopOnly}>
          <NavItem></NavItem>
        </div>
      </header>
    );
}

export default ToolBar; 