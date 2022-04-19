import React from 'react'
import type { GatsbySSR } from 'gatsby'

import wrapRoot from './src/components/wrapRoot'
import wrapPage from './src/components/wrapPage'
import { getInitialColorModeScript } from './src/utils/colorMode'

export const wrapRootElement = wrapRoot
export const wrapPageElement = wrapPage

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script key="initial_color_mode" dangerouslySetInnerHTML={{ __html: getInitialColorModeScript().code! }} />,
  ])
}
