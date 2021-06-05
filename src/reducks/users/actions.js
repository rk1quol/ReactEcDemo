export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART'

export const signInAction = (userState) => {
  return {
    type: 'SIGN_IN',
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username
    }
  }
}

export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: {
      isSignedIn: false,
      role: '',
      uid: '',
      username: ''
    }
  }
}

export const fetchProductsInCartAction = (carts) => {
  return {
    type: 'FETCH_PRODUCTS_IN_CART',
    payload: carts,
  }
}