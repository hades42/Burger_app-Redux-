import React from "react"
import styles from "./Control.module.css"

const Control = (props) => {
   return (
     <div className={styles.Control}>
       <div className={styles.Label}>{props.label}</div>
       <button
         className={styles.Less}
         onClick={props.removeIngredient}
         disabled={props.allowDisable}
       >
         Less
       </button>
       <button className={styles.More} onClick={props.addIngredient}>
         More
       </button>
     </div>
   );
}

export default Control;