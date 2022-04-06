import React from 'react'
import type { GatsbyBrowser } from 'gatsby'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle, theme } from '../styles'

const wrapRoot: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  /* it will be called only once in browser, when React mounts */

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {element}
    </ThemeProvider>
  )
}

export default wrapRoot
