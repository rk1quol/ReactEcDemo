import { useCallback, useState } from 'react'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { useDispatch } from "react-redux";
import { signIn } from "../reducks/users/operations";
import { push } from 'connected-react-router'

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
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
        rows={1} value={email} type={'email'} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={'パスワード'} multiline={false} required={true}
        rows={1} value={password} type={'password'} onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className={'center'}>
        <PrimaryButton label={'Sign In'} onClick={() => dispatch(signIn(email, password))} />
        <p><a href={'/signup'}>アカウントをお持ちでない方はこちら</a></p>
        <p><a href={'/signin/reset'}>パスワードをお忘れの方はこちら</a></p>
      </div>
    </div>
  )
}

export default SignIn