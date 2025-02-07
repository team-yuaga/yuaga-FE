import styled from 'styled-components'

interface buttonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

export const Button = ({ onClick, children, disabled }: buttonProps) => {
  return (
    <ButtonStyle onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.button`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.brown['04']};
  padding: 18px;
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: ${({ theme }) => theme.brown['01']};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.gray['02']};
  }
`
