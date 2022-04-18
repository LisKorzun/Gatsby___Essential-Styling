import { css } from 'styled-components'

import ComfortaaRegular from '../assets/fonts/Comfortaa/Comfortaa-Regular.ttf'

const fonts = css`
  @font-face {
    font-family: 'Comfortaa';
    src: url(${ComfortaaRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: auto;
  }
  @font-face {
    font-family: 'Comfortaa';
    src: url('/fonts/Comfortaa/Comfortaa-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
  @font-face {
    font-family: 'Comfortaa';
    src: url('/fonts/Comfortaa/Comfortaa-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: auto;
  }
  @font-face {
    font-family: 'Comfortaa';
    src: url('/fonts/Comfortaa/Comfortaa-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: auto;
  }
  @font-face {
    font-family: 'Comfortaa';
    src: url('/fonts/Comfortaa/Comfortaa-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: auto;
  }
`

export default fonts
