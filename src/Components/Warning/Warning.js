import React from "react"
import Aux from "../../hoc/Aux"
import Btn from "../UI/Button/Button"

class Warning extends React.Component{
    render(){
        return (
          <Aux>
            <h3>{this.props.messege}</h3>
            <Btn clicked={this.props.resetCancel} btnType="Danger">
              CANCEL
            </Btn>
            <Btn clicked={this.props.resetExecute} btnType="Success">
              JUST DO IT!
            </Btn>
          </Aux>
        );
    }
}

export default Warning;