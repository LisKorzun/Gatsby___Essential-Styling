import React from 'react'
import type { GatsbyBrowser } from 'gatsby'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle, theme } from '../styles'
import { ColorModeProvider } from '../store'

const wrapRoot: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  /* it will be called only once in browser, when React mounts */

  return (
    <ColorModeProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {element}
      </ThemeProvider>
    </ColorModeProvider>
  )
}

export default wrapRoot
