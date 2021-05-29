import { useCallback, useState } from 'react'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { useDispatch } from "react-redux";
import { resetPassword } from "../reducks/users/operations";

const Reset = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')

  const inputEmail = useCallback( (e) => {
    setEmail(e.target.value)
  }, [setEmail])

  return (
    <div className={'c-section-container'}>
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
        rows={1} value={email} type={'email'} onChange={inputEmail}
      />
      <div className="module-spacer--medium" />
      <div className={'center'}>
        <PrimaryButton label={'パスワードリセット'} onClick={() => dispatch(resetPassword(email))} />
      </div>
    </div>
  )
}

export default Reset