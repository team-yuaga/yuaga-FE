import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { Header } from '../components/header'
import { Back, SigninImg } from '../assets'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Checkbox } from '../components/checkbox'
import { UseLogin } from '../apis/users'
import { cookie } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const { mutate: useLoginMutate } = UseLogin();
  const [loginData, setLoginData] = useState({
    accountId: '',
    password: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    const savedId = localStorage.getItem('id')
    if (savedId) {
      setLoginData((prevData) => ({ ...prevData, id: savedId }))
      setChecked(true)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    if (name === 'id' && checked) {
      localStorage.setItem('id', value)
    }
  }

  const handleChangeCheckbox = () => {
    const newChecked = !checked
    setChecked(newChecked)

    if (newChecked) {
      localStorage.setItem('id', loginData.accountId)
    } else {
      localStorage.removeItem('id')
    }
  }

  const Login = () => {
    useLoginMutate(loginData, {
      onSuccess: (data) => {
        cookie.set('access_token', data.access_token)
        navigate('/main')
      }
    }
    )
  }

  return (
    <LoginContainer>
      <Header />
      <BackButton src={Back} />
      <LoginContentWrap>
        <InputWrap>
          <p>welcome back</p>
          <Input onChange={handleChange} name="accountId" value={loginData.accountId} label="아이디" />
          <Input onChange={handleChange} name="password" value={loginData.password} label="비밀번호" type="password" />
          <IdSaveWrap>
            <Checkbox id="id-save" checked={checked} onChange={handleChangeCheckbox} />
            <IdSaveLabel htmlFor="id-save">아이디 저장</IdSaveLabel>
          </IdSaveWrap>
          <Button onClick={Login}>로그인</Button>
        </InputWrap>
        <LoginImgContent src={SigninImg} />
      </LoginContentWrap>
    </LoginContainer>
  )
}
const LoginContainer = styled.div`
  padding-top: 74px;
  background-color: ${({ theme }) => theme.brown['03']};
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BackButton = styled.img`
  cursor: pointer;
  padding: 22px 16px;
  background-color: ${({ theme }) => theme.brown['03']};
  align-self: flex-start;
`

const LoginContentWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`

const InputWrap = styled.div`
  width: 650px;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  height: 760px;
  padding: 0 108px;
`

const LoginImgContent = styled.img`
  padding: 0 44px;
  background-color: ${({ theme }) => theme.brown['01']};
`

const IdSaveWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
`

const IdSaveLabel = styled.label`
  font-size: 10px;
`
