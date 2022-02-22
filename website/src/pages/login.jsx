import { useEffect, useState } from 'react'
import { login as loginUser } from '../utils/userApi'
import Loading from '../components/UI/Loading'
import { TextInput, PasswordInput } from '../components/UI/Inputs'
import Card from '../components/UI/Card'
import { Header } from '../components/UI/Typography'
import Button from '../components/UI/Button'
import useUser from '../hooks/useUser'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [formValid, setFormValid] = useState(true)

  const [loginData, setLoginData] = useState({
    loading: false,
    error: undefined,
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      const emailValid =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email.toLowerCase()
        )
      setFormValid(emailValid)
    }, 200)

    return () => {
      clearTimeout(timeout)
    }
  }, [email])

  const { mutate } = useUser()

  const login = async (e) => {
    e.preventDefault()

    if (!formValid) {
      return
    }

    setLoginData({
      error: undefined,
      loading: true,
    })

    try {
      await loginUser({ email, password })
      mutate(null)
    } catch (e) {
      setLoginData({
        loading: false,
        error: e,
      })
    }
  }

  const errorMessage =
    loginData.error &&
    (loginData.error.response
      ? loginData.error.response.data.msg
      : loginData.error.toJSON().msg)

  const canSubmit = password.length !== 0 && formValid

  return (
    <main className="my-auto flex-grow h-full w-full">
      {errorMessage && (
        <p className={'text-red-500 pb-2 font-semibold text-lg'}>
          {errorMessage}
        </p>
      )}
      <form>
        <Card className={'mx-auto'}>
          <Header ariaLabel="Login to your account">Login</Header>
          <br />
          <TextInput
            label={'Email'}
            value={email}
            setValue={setEmail}
            invalid={email.length === 0 ? false : !formValid}
          />

          <br />

          <PasswordInput
            label={'Password'}
            value={password}
            setValue={setPassword}
            hidden={passwordHidden}
            toggleHidden={() => {
              setPasswordHidden((old) => !old)
            }}
          />

          <div className="mt-8">
            <Button
              onClick={login}
              disabled={loginData.loading || !canSubmit}
              aria-label={'login to my account'}
              className={`w-full`}
            >
              Login
            </Button>
          </div>
        </Card>
      </form>

      {loginData.loading && (
        <Loading
          style={{
            position: 'relative',
            marginTop: '2rem',
          }}
        />
      )}
    </main>
  )
}

Login.isAnonymous = true

export default Login
