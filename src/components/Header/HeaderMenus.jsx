import React, {useCallback, useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart, getUserId} from "../../reducks/users/selectors";
import {fetchProductsInCart} from "../../reducks/users/operations";
import {push} from 'connected-react-router'
import {db} from "../../firebase";

const HeaderMenus = (props) => {
  const selector = useSelector(state => state)
  const dispatch = useDispatch()
  const uid = getUserId(selector)
  let carts = getProductsInCart(selector)

  useEffect(() => {
    const unsubscribe = db.collection('users').doc(uid).collection('cart')
      .onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const product = change.doc.data()
          const changeType = change.type

          switch(changeType) {
            case 'added':
              carts.push(product)
              break
            case 'modified':
              const index = carts.findIndex(product => product.cartId === change.doc.id)
              carts[index] = product
              break
            case 'removed':
              carts = carts.filter(product => product.cartId !== change.doc.id)
              break
            default:
              break
          }
        })

        dispatch(fetchProductsInCart(carts))

      })

    return () => unsubscribe()
  }, [])

  const goToCart = useCallback(() => {
    dispatch(push('/cart'))
  },[])

  return (
    <>
      <IconButton>
        <Badge badgeContent={carts.length} color="secondary">
          <ShoppingCartIcon onClick={goToCart} />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenus