import React, {useCallback} from 'react'
import {useDispatch} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ImagePreview from "./ImagePreview";
import {makeStyles} from "@material-ui/styles";
import {storage} from "../../firebase";

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  }
})

const ImageArea = (props) => {
  const dispatch = useDispatch()

  const uploadImage = useCallback((e) => {
    const file = e.target.files
    let blob = new Blob(file, { type: 'image/jpeg' })

    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const N = 16
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map(n => S[n%S.length])
      .join('')

    const uploadRef = storage.ref('images').child(fileName)
    const uploadTask = uploadRef.put(blob)

    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const newImage = {id: fileName, path: downloadURL}
        props.setImages((prevState => [...prevState, newImage]))
      })
    })
  }, [props.setImages])

  const deleteImage = useCallback(async (id) => {
    const ret = window.confirm('この画像を削除しますか？')
    if (!ret) {
      return false
    } else {
      const newImages = props.images.filter(image => image.id !== id)
      props.setImages(newImages)
      return storage.ref('images').child(id).delete()
    }
  }, [props.images])

  const classes = useStyles()

  return (
    <div>
      <div className="p-grid__list-images">
        { props.images.length > 0 && (
          props.images.map(image => (
            <ImagePreview onClick={deleteImage} id={image.id} path={image.path} key={image.id} />
          ))
        )}
      </div>
      <div className="u-text-right">
        <label htmlFor="image">
          商品画像を登録する
          <IconButton className={classes.icon}>
            <label htmlFor="image">
              <AddPhotoAlternateIcon />
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="u-display-none"
              onChange={(e) => uploadImage(e)}
            />
          </IconButton>
        </label>
      </div>
    </div>
  )
}

export default ImageArea