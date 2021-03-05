import React from "react"
import burgerLogo from "../../assets/image/burger-logo.png";
import styles from "./Logo.module.css"

const Logo = (props) => {
    return (
        <div className={styles.Logo}>
            <img src={burgerLogo} alt="Burger Logo"></img>
        </div>
    )
}

export default Logo;