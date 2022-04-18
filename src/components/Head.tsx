import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import ComfortaaRegular from '../assets/fonts/Comfortaa/Comfortaa-Regular.ttf'

const Head: FC = () => (
  <Helmet title="foo bar" defer={false}>
    <link rel="preload" as="font" href={ComfortaaRegular} type="font/ttf" crossOrigin="anonymous" />
    <link rel="preload" as="font" href="/fonts/Comfortaa/Comfortaa-Bold.ttf" type="font/ttf" crossOrigin="anonymous" />
  </Helmet>
)

export default Head
