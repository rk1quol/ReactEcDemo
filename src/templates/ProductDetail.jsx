import React, {useEffect, useState} from "react";
import {db} from "../firebase";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {returnCodeToBr} from "../functions/common";
import {ImageSwiper, SizeTable} from "../components/Products";

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

  const path = selector.router.location.pathname
  const id = path.split('/product/')[1]
  const [product, setProduct] = useState()

  useEffect(() => {
    db.collection('products').doc(id).get()
      .then(snapshot => {
        const newProduct = snapshot.data()
        setProduct(newProduct)
      })
  }, [])

  const classes = useStyles()

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <div className="module-spacer--small" />
            <SizeTable sizes={product.sizes} />
            <div className="module-spacer--small" />
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail