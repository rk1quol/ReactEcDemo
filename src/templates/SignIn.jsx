import { useCallback, useState } from 'react'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { useDispatch } from "react-redux";
import { signIn } from "../reducks/users/operations";

const SignIn = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('')

  const inputEmail = useCallback( (e) => {
    setEmail(e.target.value)
  }, [setEmail])

  const inputPassword = useCallback( (e) => {
    setPassword(e.target.value)
  }, [setPassword])

  return (
    <div className={'c-section-container'}>
      <h2 className="u-text__headline u-text-center">サインイン画面</h2>
      <div className="module-spacer-medium" />
      <TextInput
        fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
        rows={1} value={email} type={'email'} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={'パスワード'} multiline={false} required={true}
        rows={1} value={password} type={'password'} onChange={inputPassword}
      />
      <div className={'center'}>
        <PrimaryButton label={'Sign In'} onClick={() => dispatch(signIn(email, password))} />
      </div>
    </div>
  )
}

export default SignIn