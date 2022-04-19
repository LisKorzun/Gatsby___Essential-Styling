import React, { FC, useContext, createContext } from 'react'

import { COLORS, COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP, TModes, TColors } from '../styles'

interface IColorModeContext {
  mode: TModes | null
  setMode: (newMode: TModes) => void
}

export const ColorModeContext = createContext<IColorModeContext>({ mode: null, setMode: () => {} })

export const useColorModeContext = () => useContext(ColorModeContext)

export const ColorModeProvider: FC = ({ children }) => {
  const [mode, setColorMode] = React.useState<TModes | null>(null)

  React.useEffect(() => {
    setColorMode(window.document.documentElement.style.getPropertyValue(INITIAL_COLOR_MODE_CSS_PROP) as TModes)
  }, [])

  const contextValue = React.useMemo(() => {
    const setMode = (newMode: TModes) => {
      localStorage.setItem(COLOR_MODE_KEY, newMode)

      Object.entries(COLORS as TColors).forEach(([colorName, colorsByModes]) => {
        const cssVarName = `--color-${colorName}`

        window.document.documentElement.style.setProperty(cssVarName, colorsByModes[newMode])
      })

      setColorMode(newMode)
    }

    return {
      mode,
      setMode,
    }
  }, [mode, setColorMode])

  return <ColorModeContext.Provider value={contextValue}>{children}</ColorModeContext.Provider>
}
