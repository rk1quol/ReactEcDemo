import React from "react";
import {Route, Switch} from 'react-router'
import { Home, ProductEdit, ProductList, ProductDetail, OrderConfirm, CartList, SignIn, SignUp, Reset } from "./templates";
import Auth from './Auth'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Reset} />
      <Auth>
        <Route exact path="(/)?" component={ProductList} />
        <Route exact path="/cart" component={CartList} />
        <Route exact path="/order/confirm" component={OrderConfirm} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route path="/product/edit(/:id)?" component={ProductEdit} />
      </Auth>
    </Switch>
  )
}

export default Router