import Layout from "./Components/Layout/Layout";
import BurgerBuider from "./Container/BurgurBuilder/BurgerBuilder";
import Checkout from "./Container/Checkout/Checkout";
import Orders from "./Container/Orders/Orders";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/" exact component={BurgerBuider}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
