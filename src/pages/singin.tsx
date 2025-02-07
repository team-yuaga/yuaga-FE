import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { Header } from '../components/header'
import { Back, SigninImg } from '../assets'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Checkbox } from '../components/checkbox'

export const Signin = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [SigninData, setSigninData] = useState({
    id: '',
    password: '',
  })
  const [checkPassword, setCheckPassword] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSigninData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value)
  }

  return (
    <SigninContainer>
      <Header />
      <BackButton src={Back} />
      <SigninContentWrap>
        <InputWrap>
          <p>welcome to YuaGa</p>
          <Input onChange={handleChange} name="id" value={SigninData.id} label="아이디" />
          <Input onChange={handleChange} name="password" value={SigninData.password} label="비밀번호" type="password" />
          <ErrorMessage>영문, 숫자, 특수문자의 조합을 포함해야합니다</ErrorMessage>
          <Input onChange={handleCheckPassword} name="repassword" value={checkPassword} label="비밀번호확인" type="password" />
          <ErrorMessage>비밀번호가 일치하지않습니다</ErrorMessage>
          <Button onClick={() => {}}>다음</Button>
        </InputWrap>
        <SigninImgContent src={SigninImg} />
      </SigninContentWrap>
    </SigninContainer>
  )
}
const SigninContainer = styled.div`
  padding-top: 74px;
  background-color: ${({ theme }) => theme.brown['03']};
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.red};
`

const BackButton = styled.img`
  cursor: pointer;
  padding: 22px 16px;
  background-color: ${({ theme }) => theme.brown['03']};
  align-self: flex-start;
`

const SigninContentWrap = styled.div`
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

const SigninImgContent = styled.img`
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
