import React, {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import {makeStyles} from "@material-ui/styles";
import {CartListItem} from "../components/Products";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {PrimaryButton} from "../components/UIkit";
import {TextDetail} from "../components/UIkit";
import {orderProduct} from "../reducks/products/operations";

const useStyles = makeStyles(theme => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      width: 512,
    },
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 256,
    width: 288,
    margin: '24px auto 16px',
    padding: 16,
  }
}))

const OrderConfirm = () => {
  const selector = useSelector(state => state)
  const dispatch = useDispatch()
  const productsInCart = getProductsInCart(selector)
  const subTotal = productsInCart.reduce((sum, product) => sum += product.price, 0)
  const shoppingFee = subTotal >= 10000 ? 0 : 220
  const tax = subTotal * 0.1
  const total = subTotal + shoppingFee + tax

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total))
  }, [productsInCart, total])

  const classes = useStyles()
  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 && (
              productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
            )}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={'商品合計'} value={`¥${subTotal.toLocaleString()}`} />
          <TextDetail label={'送料'} value={`¥${shoppingFee.toLocaleString()}`} />
          <TextDetail label={'消費税'} value={`¥${tax.toLocaleString()}`} />
          <Divider />
          <TextDetail label={'合計（税込）'} value={`¥${total.toLocaleString()}`} />
          <PrimaryButton label={'注文を確定する'} onClick={order} />
        </div>
      </div>
    </section>
  )
}

export default OrderConfirm