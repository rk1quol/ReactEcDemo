import {db, FirebaseTimestamp} from "../../firebase";
import {push} from 'connected-react-router'
import {fetchProductsAction, deleteProductsAction} from "./actions";

const productsRef = db.collection('products')

export const saveProduct = (id, category, description, gender, images, name, price, sizes) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now()
    const data = {
      id,
      category,
      description,
      gender,
      images,
      name,
      price: parseInt(price, 10),
      sizes,
      updated_at: timestamp
    }

    // 新規登録の場合の処理
    if (id === '') {
      const ref = productsRef.doc()
      data.created_at = timestamp
      id = ref.id
      data.id = id
    }

    return productsRef.doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push('/'))
      })
      .catch((err) => {
        throw new Error(err)
      })
  }

}

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef.orderBy('updated_at', 'desc').get()
      .then(snapshots => {
        const productList = []
        snapshots.forEach(snapshot => {
          const product = snapshot.data()
          productList.push(product)
        })
        dispatch(fetchProductsAction(productList))
      })
  }
}

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
      .then(() => {
        const prevProducts = getState().products.list
        const nextProducts = prevProducts.filter(product => product.id !== id)
        dispatch(deleteProductsAction(nextProducts))
      })
  }
}

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const userRef = db.collection('users').doc(uid)
    const timestamp = FirebaseTimestamp.now()

    let products = [],
      soldOutProducts = []


    const batch = db.batch()

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get()
      const sizes = snapshot.data().sizes

      const updatedSizes = sizes.map(size => {
        if (size.size === product.size && size.quantity === 0) {
          soldOutProducts.push(product.name)
          return size
        } else if (size.size === product.size) {
          return {
            size: size.size,
            quantity: size.quantity - 1
          }
        } else {
          return size
        }
      })

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      })

      batch.update(
        productsRef.doc(product.productId),
        {sizes: updatedSizes}
      )
      batch.delete(
        userRef.collection('cart').doc(product.cartId)
      )
    }

    if (soldOutProducts.length > 0) {
      const errorMessage = (soldOutProducts.length > 1) ?
                              soldOutProducts.join('と') :
                              soldOutProducts[0]
      alert(`大変申し訳ございません。${errorMessage}が在庫切れとなったため、注文処理を中断しました。`)
      return false
    } else {
      batch.commit()
        .then(() => {
          const orderRef = userRef.collection('orders').doc()
          const date = timestamp.toDate()
          const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

          const history = {
            amount,
            created_at: timestamp,
            updated_at: timestamp,
            id: orderRef.id,
            products: [...products],
            shipping_date: shippingDate,
          }

          orderRef.set(history)
          dispatch(push('/order/complete'))
        })
        .catch(() => { alert('注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。') })
    }

  }

}