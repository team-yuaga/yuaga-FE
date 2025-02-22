import { useState } from 'react'
import { styled } from 'styled-components'
import { Header } from '../components/header'
import { Back, SigninImg } from '../assets'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { useSignin } from '../apis/users'
import { useNavigate } from 'react-router-dom'

export const Signin = () => {
  const [signinData, setSigninData] = useState({
    accountId: '',
    password: '',
    checkPassword: '',
    nickname: '',
  })
  const navigate = useNavigate();
  const [checkPassword, setCheckPassword] = useState<string>('')
  const [step, setStep] = useState<number>(1)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const { mutate: SigninMutate } = useSignin()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSigninData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  const handleSignup = () => {
    setShowSuccessModal(true)
    SigninMutate(signinData, {
      onSuccess: () => {
        showSuccessModal === false && navigate('/login');
      }
    })
    setTimeout(() => {
      setShowSuccessModal(false)
    }, 2000)
  }

  return (
    <SigninContainer>
      <Header />
      <BackButton src={Back} />
      <SigninContentWrap>
        <InputWrap>
          <p>welcome to YuaGa</p>
          {step === 1 ? (
            <>
              <Input onChange={handleChange} name="accountId" value={signinData.accountId} label="아이디" />
              <Input onChange={handleChange} name="password" value={signinData.password} label="비밀번호" type="password" />
              <ErrorMessage>영문, 특수문자의 조합하여 10자 이상이어야 합니다</ErrorMessage>
              <Input onChange={handleChange} name="checkPassword" value={signinData.checkPassword} label="비밀번호확인" type="password" />
              {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>}
              <Button onClick={handleNextStep}>다음</Button>
            </>
          ) : (
            <>
              <Input onChange={handleChange} name="nickname" value={signinData.nickname} label="닉네임" />
              <Button onClick={handleSignup}>회원가입</Button>
            </>
          )}
        </InputWrap>
        <SigninImgContent src={SigninImg} />
      </SigninContentWrap>
      {showSuccessModal && (
        <SuccessModal>
          <p>회원가입이 성공적으로 완료되었습니다!</p>
        </SuccessModal>
      )}
    </SigninContainer>
  )
}

const SigninContainer = styled.div`
  padding: 74px 0;
  background-color: ${({ theme }) => theme.brown['03']};
  height: 100%;
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

const SuccessModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.white};
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.gray['03']};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`