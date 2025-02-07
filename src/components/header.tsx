import { styled } from 'styled-components'
import { Logo } from '../assets'

export const Header = () => {
  return (
    <HeaderContainer>
      <LogoImg src={Logo} onClick={() => {}} />
      <div></div>
    </HeaderContainer>
  )
}

const LogoImg = styled.img`
  cursor: pointer;
  background-color: ${({ theme }) => theme.brown['03']};
`

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }) => theme.brown['03']};
  border-bottom: 1px solid ${({ theme }) => theme.brown['04']};
`
