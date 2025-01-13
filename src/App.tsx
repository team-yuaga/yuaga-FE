import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from './styles/global'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
