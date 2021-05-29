import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import thunk from "redux-thunk";
import {connectRouter, routerMiddleware} from "connected-react-router";
import { ProductsReducer } from '../products/reducers'
import { UsersReducer } from '../users/reducers'

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      products: ProductsReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}
