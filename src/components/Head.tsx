import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

// import ComfortaaRegular from '../assets/fonts/Comfortaa/Comfortaa-Regular.ttf'
// import ComfortaaBold from '../assets/fonts/Comfortaa/Comfortaa-Bold.ttf'
// import ComfortaaSemiBold from '../assets/fonts/Comfortaa/Comfortaa-SemiBold.ttf'
// import ComfortaaLight from '../assets/fonts/Comfortaa/Comfortaa-Light.ttf'
// import ComfortaaMedium from '../assets/fonts/Comfortaa/Comfortaa-Medium.ttf'

const Head: FC = () => (
  <Helmet title="foo bar" defer={false}>
    {/*<link*/}
    {/*  rel="preload"*/}
    {/*  as="font"*/}
    {/*  href="/fonts/Comfortaa/Comfortaa-SemiBold.ttf"*/}
    {/*  type="font/ttf"*/}
    {/*  crossOrigin="anonymous"*/}
    {/*/>*/}
    <link rel="preload" as="font" href="/fonts/Comfortaa/Comfortaa-Bold.ttf" type="font/ttf" crossOrigin="anonymous" />
    {/*<link rel="preload" as="font" href={ComfortaaSemiBold} type="font/ttf" crossOrigin="anonymous" />*/}
    {/*<link rel="preload" as="font" href={ComfortaaLight} type="font/ttf" crossOrigin="anonymous" />*/}
    {/*<link rel="preload" as="font" href={ComfortaaMedium} type="font/ttf" crossOrigin="anonymous" />*/}
  </Helmet>
)

export default Head
