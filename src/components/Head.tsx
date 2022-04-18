import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

const Head: FC = () => (
  <Helmet title="foo bar" defer={false}>
    <link rel="preload" as="font" href="/fonts/Comfortaa/Comfortaa-Bold.ttf" type="font/ttf" crossOrigin="anonymous" />
  </Helmet>
)

export default Head
