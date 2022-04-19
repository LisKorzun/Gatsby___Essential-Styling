import { createGlobalStyle } from 'styled-components'

import fonts from './fonts'
import variables from './variables'
import normalize from './normalize'

const GlobalStyles = createGlobalStyle`
  ${fonts};
  ${normalize};
  ${variables};

  /* Put here your global styles*/
  body {
    font-family: var(--font-sans);
    color: var(--color-text);
    background-color: var(--color-background);
    margin: 100px auto;
    width: 500px;
  }  
  h1 {
    color: var(--color-primary);
  }
`

export default GlobalStyles
