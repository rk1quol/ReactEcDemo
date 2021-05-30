import React from "react";
import {Route, Switch} from 'react-router'
import { Home, ProductEdit, ProductList, SignIn, SignUp, Reset } from "./templates";
import Auth from './Auth'
const Router = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Reset} />
      <Auth>
        <Route exact path="(/)?" component={ProductList} />
        {/*<Route exact path="/product/:id" component={ProductDetail} />*/}
        <Route path="/product/edit(/:id)?" component={ProductEdit} />
      </Auth>
    </Switch>
  )
}

export default Router