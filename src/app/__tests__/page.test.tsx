import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme/theme'
import Home from '../page'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Home Page', () => {
  test('renders main heading', () => {
    renderWithTheme(<Home />)
    expect(screen.getByRole('heading', { name: /learning claude code/i })).toBeInTheDocument()
  })

  test('renders subtitle', () => {
    renderWithTheme(<Home />)
    expect(screen.getByText(/hands-on journey building interactive apps/i)).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    renderWithTheme(<Home />)
    expect(screen.getByRole('link', { name: /system architecture/i })).toHaveAttribute('href', '/architecture')
    expect(screen.getByRole('link', { name: /tic tac toe/i })).toHaveAttribute('href', '/tic-tac-toe')
    expect(screen.getByRole('link', { name: /pong game/i })).toHaveAttribute('href', '/pong')
  })

  test('renders feature chips', () => {
    renderWithTheme(<Home />)
    expect(screen.getByText('Claude Code')).toBeInTheDocument()
    expect(screen.getByText('Learning')).toBeInTheDocument()
    expect(screen.getByText('Building')).toBeInTheDocument()
    expect(screen.getByText('Interactive')).toBeInTheDocument()
  })
})