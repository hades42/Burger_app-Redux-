import Layout from "./Components/Layout/Layout";
import BurgerBuider from "./Container/BurgurBuilder/BurgerBuilder";
import Checkout from "./Container/Checkout/Checkout";
import Orders from "./Container/Orders/Orders";
import { Route, Switch } from "react-router-dom";
import Auth from "./Container/Auth/auth";
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/" exact component={BurgerBuider}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
