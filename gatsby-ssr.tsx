import React from 'react'
import type { GatsbySSR } from 'gatsby'

import wrapRoot from './src/components/wrapRoot'
import wrapPage from './src/components/wrapPage'
import { getInitialColorModeScript, getFallBackColorStyles } from './src/utils/colorMode'

export const wrapRootElement = wrapRoot
export const wrapPageElement = wrapPage

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setPreBodyComponents, setHeadComponents }) => {
  setHeadComponents([<style>{getFallBackColorStyles()}</style>])
  setPreBodyComponents([
    <script key="block" dangerouslySetInnerHTML={{ __html: `(() => {alert('No UI for you!');})()` }} />,
    <script key="initial_color_mode" dangerouslySetInnerHTML={{ __html: getInitialColorModeScript().code! }} />,
  ])
}
