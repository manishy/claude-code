import { render, screen } from '@testing-library/react'
import ThemeProvider from '../ThemeProvider'

// Mock the entire theme module to avoid createTheme issues
jest.mock('../../theme/theme', () => ({
  __esModule: true,
  default: {
    palette: { mode: 'light' },
    typography: { fontFamily: 'Arial' },
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } }
  }
}))

jest.mock('@mui/material/styles', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="mui-theme-provider">{children}</div>,
}))

jest.mock('@mui/material/CssBaseline', () => {
  return function CssBaseline() {
    return <div data-testid="css-baseline" />
  }
})

describe('ThemeProvider Component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    )
    
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  test('wraps children with MUI ThemeProvider', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('mui-theme-provider')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  test('includes CssBaseline component', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('css-baseline')).toBeInTheDocument()
  })
})