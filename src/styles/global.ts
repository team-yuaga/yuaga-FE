import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
  }
`

export const theme = {
  brown: {
    '01': 'var(--main-brown-01)',
    '02': 'var(--main-brown-02)',
    '03': 'var(--main-brown-03)',
    '04': 'var(--main-brown-04)',
  },
  red: 'var(--red)',
  white: 'var(--white)',
  black: 'var(--black)',
  heart: 'var(--heart)',
  gray: {
    '01': 'var(--gray-01)',
    '02': 'var(--gray-02)',
  },
}
