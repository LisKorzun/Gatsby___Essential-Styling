import { css } from 'styled-components'

import ComfortaaRegular from '../assets/fonts/Comfortaa/Comfortaa-Regular.ttf'
import ComfortaaBold from '../assets/fonts/Comfortaa/Comfortaa-Bold.ttf'
import ComfortaaSemiBold from '../assets/fonts/Comfortaa/Comfortaa-SemiBold.ttf'
import ComfortaaLight from '../assets/fonts/Comfortaa/Comfortaa-Light.ttf'
import ComfortaaMedium from '../assets/fonts/Comfortaa/Comfortaa-Medium.ttf'

const fonts = css`
  @font-face {
    font-family: 'Comfortaa';
    src: url(${ComfortaaRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Comfortaa';
    src: url(${ComfortaaLight}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Comfortaa';
    src: url(${ComfortaaMedium}) format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Comfortaa';
    src: url(${ComfortaaSemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Comfortaa';
    src: url(${ComfortaaBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`

export default fonts
