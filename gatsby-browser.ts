import './src/styles/global.css'

import wrapRoot from './src/components/wrapRoot'
import wrapPage from './src/components/wrapPage'

export const wrapRootElement = wrapRoot
export const wrapPageElement = wrapPage

export const onInitialClientRender = () => {
  console.log('ReactDOM.render has executed')
}

export const onClientEntry = () => {
  console.log("We've started!")
}

export const disableCorePrefetching = () => true
