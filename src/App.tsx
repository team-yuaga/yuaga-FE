import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from './styles/global'
import './styles/glocal.css'
import { Header } from './components/header'
import { RouterProvider } from 'react-router-dom'
import { Router } from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient} >
        <GlobalStyle />
        <Header />
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
