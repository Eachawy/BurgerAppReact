import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
            <Layout>
              <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={Checkout} />
              </Switch>
            </Layout>
        </div>
      </BrowserRouter>
    ); 
  }
}


export default App;
