import React, { FC } from 'react'

import Head from './Head'

const Layout: FC = ({ children, ...propsUsedByPage }) => {
  console.log(propsUsedByPage)
  // Layout receives same data as Page element will get
  // including location, path, uri, params, data, pageContext, etc

  return (
    <>
      <Head />
      <header>Site Name</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  )
}

export default Layout
