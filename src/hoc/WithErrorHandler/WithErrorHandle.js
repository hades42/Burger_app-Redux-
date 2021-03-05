import React from "react"
import Modal from "../../Components/UI/Modal/Modal"
import Aux from "../Aux"


const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component{
        constructor(){
            super();
            this.state={
                error: null
            }
        }
        componentDidMount(){
           this.reqInterceptor =  axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(
              (res) => res,
              (error) => {
                this.setState({ error: error });
              }
            );
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }


        errorConfirmed = () =>{
            this.setState({error: null})
        }

        render(){
            return (
              <Aux>
                <Modal show={this.state.error} hidden={this.errorConfirmed}>
                  {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}></WrappedComponent>
              </Aux>
            );
        }
    }
}

export default WithErrorHandler