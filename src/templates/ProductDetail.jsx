import React, {useEffect, useCallback, useState} from "react";
import {db, FirebaseTimestamp} from "../firebase";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {returnCodeToBr} from "../functions/common";
import {ImageSwiper, SizeTable} from "../components/Products";
import {addProductToCart} from "../reducks/users/operations";

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 480,
      width: 480,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 'auto',
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 480,
    },
  },
  price: {
    fontSize: 36,
  }
}))

const ProductDetail = () => {
  const selector = useSelector(state => state)
  const dispatch = useDispatch()

  const path = selector.router.location.pathname
  const id = path.split('/product/')[1]
  const [product, setProduct] = useState(null)

  useEffect(() => {
    db.collection('products').doc(id).get()
      .then(snapshot => {
        const newProduct = snapshot.data()
        setProduct(newProduct)
      })
  }, [])

  const classes = useStyles()

  const addProduct = useCallback((selectedSize) => {
    const timestamp = FirebaseTimestamp.now()
    dispatch(addProductToCart({
      added_at: timestamp,
      description: product.description,
      gender: product.gender,
      images: product.images,
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      size: selectedSize,
    }))
  }, [product])

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>&#165;{product.price.toLocaleString()}</p>
            <div className="module-spacer--small" />
            <SizeTable addProduct={addProduct} sizes={product.sizes} />
            <div className="module-spacer--small" />
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail