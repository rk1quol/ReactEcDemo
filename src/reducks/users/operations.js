import {signInAction, signOutAction} from "./actions";
import {push} from 'connected-react-router'
import { isValidRequiredInput, isValidEmailFormat } from "../../functions/common";

import {auth, db, FirebaseTimestamp} from '../../firebase'

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid
        db.collection('users').doc(uid).get()
          .then(snapshot => {
            const data = snapshot.data()
            dispatch(signInAction({
              isSignedIn: true,
              role: data.role,
              uid,
              username: data.username
            }))
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    // Validation
    if (email === '' || password === '') {
      alert('必須項目が未入力です')
      return false
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user
        if (user) {
          const uid = user.uid
          db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()
              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid,
                username: data.username
              }))
              dispatch(push('/'))
            })
        }
      })
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validation
    if (!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert('必須項目が未入力です')
      return false
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が正しくありません')
      return false
    }

    if (password !== confirmPassword) {
      alert('パスワードが確認用と一致しません')
      return false
    }
    
    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()

          const userInitialData = {
            created_at: timestamp,
            email,
            role: 'customer',
            uid,
            updated_at: timestamp,
            username,
          }

          db.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'))
            })
        }

      })
      .catch(() => null)
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction())
        dispatch(push('/signin'))
      })
  }
}

export const resetPassword = (email) =>  {
  return async (dispatch) => {
    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が正しくありません')
      return false
    } else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert('入力されたアドレスにパスワードリセット用のメールを送信しました')
          dispatch(push('/signin'))
        })
        .catch((err) => {
          alert('パスワードリセットに失敗しました')
        })
    }
  }
}
