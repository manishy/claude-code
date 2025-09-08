import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../../theme/theme'
import TicTacToe from '../page'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('TicTacToe Game', () => {
  test('renders game title', () => {
    renderWithTheme(<TicTacToe />)
    expect(screen.getByRole('heading', { name: /tic tac toe/i })).toBeInTheDocument()
  })

  test('renders 9 game cells', () => {
    renderWithTheme(<TicTacToe />)
    const allButtons = screen.getAllByRole('button')
    // Filter out buttons that have text content, aria-labels, or specific classes
    const cells = allButtons.filter(button => {
      const hasTextContent = button.textContent && button.textContent.trim().length > 0
      const hasAriaLabel = button.getAttribute('aria-label')
      const isIconButton = button.className.includes('MuiIconButton')
      return !hasTextContent && !hasAriaLabel && !isIconButton
    })
    expect(cells).toHaveLength(9)
  })

  test('allows player to make moves', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TicTacToe />)
    
    const allButtons = screen.getAllByRole('button')
    const cells = allButtons.filter(button => {
      const hasTextContent = button.textContent && button.textContent.trim().length > 0
      const hasAriaLabel = button.getAttribute('aria-label')
      const isIconButton = button.className.includes('MuiIconButton')
      return !hasTextContent && !hasAriaLabel && !isIconButton
    })
    
    await user.click(cells[0])
    expect(cells[0]).toHaveTextContent('X')
  })

  test('alternates between players', async () => {
    const user = userEvent.setup()
    renderWithTheme(<TicTacToe />)
    
    const allButtons = screen.getAllByRole('button')
    const cells = allButtons.filter(button => {
      const hasTextContent = button.textContent && button.textContent.trim().length > 0
      const hasAriaLabel = button.getAttribute('aria-label')
      const isIconButton = button.className.includes('MuiIconButton')
      return !hasTextContent && !hasAriaLabel && !isIconButton
    })
    
    await user.click(cells[0])
    expect(cells[0]).toHaveTextContent('X')
    
    await user.click(cells[1])
    expect(cells[1]).toHaveTextContent('O')
  })
})