import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../../theme/theme'
import Architecture from '../page'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Architecture Page', () => {
  beforeEach(() => {
    // Mock window.print
    Object.defineProperty(window, 'print', {
      value: jest.fn(),
      writable: true
    })
  })

  test('renders page title', () => {
    renderWithTheme(<Architecture />)
    expect(screen.getByRole('heading', { name: /claude code architecture/i })).toBeInTheDocument()
  })

  test('renders home navigation link', () => {
    renderWithTheme(<Architecture />)
    const homeLink = screen.getByRole('link')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  test('renders navigation elements', () => {
    renderWithTheme(<Architecture />)
    // Check if there's a Home icon (which indicates home navigation)
    expect(screen.getByTestId('HomeIcon')).toBeInTheDocument()
    // Check if there are Psychology icons (which indicates architectural content)  
    const psychologyIcons = screen.getAllByTestId('PsychologyIcon')
    expect(psychologyIcons.length).toBeGreaterThan(0)
  })

  test('page renders without crashing', () => {
    renderWithTheme(<Architecture />)
    // Just test that the page renders successfully
    expect(screen.getByRole('heading', { name: /claude code architecture/i })).toBeInTheDocument()
  })

  test('contains key architectural information', () => {
    renderWithTheme(<Architecture />)
    // Look for text that's actually in the architecture page
    expect(screen.getByText(/local-first development/i)).toBeInTheDocument()
    expect(screen.getByText(/privacy by design/i)).toBeInTheDocument()
  })
})