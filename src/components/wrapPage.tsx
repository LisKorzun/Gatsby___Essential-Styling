import React from 'react'
import type { GatsbyBrowser } from 'gatsby'

import Layout from './Layout'

const wrapPage: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it

  return <Layout {...props}>{element}</Layout>
}

export default wrapPage
