import { css } from 'styled-components'

import ComfortaaRegular from '../assets/fonts/Comfortaa/Comfortaa-Regular.ttf'

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
    src: url('/fonts/Comfortaa/Comfortaa-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`

export default fonts
