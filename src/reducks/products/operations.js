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