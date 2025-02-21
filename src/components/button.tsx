import styled from 'styled-components'

interface buttonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
  width?: string
}

export const Button = ({ onClick, children, disabled, width }: buttonProps) => {
  return (
    <ButtonStyle width={width} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.button<{ width?: string }>`
  width: ${({ width }) => width ? `${width}px` : '100%'};
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
