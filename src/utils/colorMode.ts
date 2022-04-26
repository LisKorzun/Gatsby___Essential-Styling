import { minify } from 'terser'

import { COLOR_MODE_KEY, COLORS, INITIAL_COLOR_MODE_CSS_PROP } from '../styles'

const setInitialColorsByUserPreferences = () => {
  const colors = '🌈'
  const colorModeKey = '🔑'
  const colorModeCssProp = '⚡️'

  const prefersDarkFromMQ = window.matchMedia('(prefers-color-scheme: dark)').matches
  const persistedPreference = localStorage.getItem(colorModeKey)

  let colorMode = 'light'

  const hasUsedToggle = typeof persistedPreference === 'string'

  if (hasUsedToggle) {
    colorMode = persistedPreference
  } else {
    colorMode = prefersDarkFromMQ ? 'dark' : 'light'
  }
  let root = document.documentElement

  root.style.setProperty(colorModeCssProp, colorMode)

  Object.entries(colors).forEach(([colorName, colorsByModes]: any[]) => {
    const cssVarName = `--color-${colorName}`

    root.style.setProperty(cssVarName, colorsByModes[colorMode])
  })
}

export const getInitialColorModeScript = () => {
  const boundFn = String(setInitialColorsByUserPreferences)
    .replace("'🌈'", JSON.stringify(COLORS))
    .replace('🔑', COLOR_MODE_KEY)
    .replace('⚡️', INITIAL_COLOR_MODE_CSS_PROP)

  return minify(`(${boundFn})()`)
}

export const getFallBackColorStyles = () => {
  const cssVariableString = Object.entries(COLORS).reduce(
    (acc, [name, colorByTheme]) => `${acc}\n--color-${name}: ${colorByTheme.light};`,
    ''
  )

  return `:root  { ${cssVariableString} }`
}
