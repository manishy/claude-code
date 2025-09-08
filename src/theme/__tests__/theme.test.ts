import theme from '../theme'

describe('Theme Configuration', () => {
  test('theme is defined', () => {
    expect(theme).toBeDefined()
  })

  test('palette mode is light', () => {
    expect(theme.palette.mode).toBe('light')
  })

  test('has primary color defined', () => {
    expect(theme.palette.primary.main).toBeDefined()
    expect(typeof theme.palette.primary.main).toBe('string')
  })

  test('has secondary color defined', () => {
    expect(theme.palette.secondary.main).toBeDefined()
    expect(typeof theme.palette.secondary.main).toBe('string')
  })

  test('typography configuration exists', () => {
    expect(theme.typography).toBeDefined()
    expect(theme.typography.fontFamily).toBeDefined()
  })

  test('breakpoints are defined', () => {
    expect(theme.breakpoints).toBeDefined()
    expect(theme.breakpoints.values.xs).toBe(0)
    expect(theme.breakpoints.values.sm).toBe(600)
    expect(theme.breakpoints.values.md).toBe(900)
    expect(theme.breakpoints.values.lg).toBe(1200)
    expect(theme.breakpoints.values.xl).toBe(1536)
  })
})