import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../../theme/theme'
import Pong from '../page'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Pong Game', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders game title', () => {
    renderWithTheme(<Pong />)
    expect(screen.getByRole('heading', { name: /pong game/i })).toBeInTheDocument()
  })

  test('renders game canvas', () => {
    renderWithTheme(<Pong />)
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  test('renders control buttons', () => {
    renderWithTheme(<Pong />)
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })

  test('renders score board', () => {
    renderWithTheme(<Pong />)
    expect(screen.getByText('Score Board')).toBeInTheDocument()
    expect(screen.getByText('Player')).toBeInTheDocument()
    expect(screen.getByText('Computer')).toBeInTheDocument()
  })

  test('initial scores are zero', () => {
    renderWithTheme(<Pong />)
    const scores = screen.getAllByText('0')
    expect(scores).toHaveLength(2)
  })
})