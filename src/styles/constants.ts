export type TModes = 'light' | 'dark'
export type TColorNames = 'text' | 'background' | 'primary'

export type TColors = {
  [key in TColorNames]: {
    [key in TModes]: string
  }
}

export const COLORS: TColors = {
  text: {
    light: '#222',
    dark: '#fff',
  },
  background: {
    light: '#fff',
    dark: '#282c35',
  },
  primary: {
    light: '#d23669',
    dark: '#ffa7c4',
  },
}

export const COLOR_MODE_KEY = 'color-mode'
export const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode'
