import { useState } from 'react'
import { styled } from 'styled-components'
import { Eye, EyeOff } from '../assets'

interface InputProps {
  label?: string
  type?: 'text' | 'password'
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  height?: number
  value?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const Input = ({ label, type = 'text', placeholder, onChange, name, value, onKeyDown, height = 54 }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <InputWrap>
      {label && <Label>{label}</Label>}
      <InputContainer height={height}>
        <InputContent type={inputType} placeholder={placeholder} onChange={onChange} name={name} value={value} onKeyDown={onKeyDown} />
        {type === 'password' && (
          <IconWrapper onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <img style={{ backgroundColor: 'white' }} src={Eye} /> : <img style={{ backgroundColor: 'white' }} src={EyeOff} />}
          </IconWrapper>
        )}
      </InputContainer>
    </InputWrap>
  )
}

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: fit-content;
  background-color: transparent;
  width: 100%;
`

const InputContainer = styled.div<{ height: number }>`
  display: flex;
  align-items: center;
  height: ${({ height }) => `${height}px`};
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.gray['02']};
  padding: 8px 16px;
  gap: 4px;
  border-radius: 5px;
  position: relative;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.brown['04']};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.brown['04']};
  }
`

const InputContent = styled.input`
  width: 100%;
  border: none;
  outline: none;
  height: 100%;
  background-color: ${({ theme }) => theme.white};
  &::placeholder {
    font-size: 17px;
    font-weight: 600;
  }
`

const Label = styled.label`
  font-size: 10px;
  color: ${({ theme }) => theme.black};
  background-color: transparent;
`

const IconWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`
