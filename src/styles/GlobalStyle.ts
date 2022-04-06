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
  }  
`

export default GlobalStyles
