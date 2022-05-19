import { minify } from 'terser'

const fontsLoader = () => {
  const fontComfortaa = new FontFace('Comfortaa', "url('/fonts/Comfortaa/Comfortaa-Bold.ttf') format('truetype')", {
    weight: '400',
    style: 'normal',
    display: 'swap',
  })
  Promise.all([fontComfortaa.load()]).then((loadedFonts) => {
    loadedFonts.forEach((font) => {
      // @ts-ignore
      document.fonts.add(font)
    })
  })
}

export const getFontLoaderScript = () => {
  return minify(`(${String(fontsLoader)})()`)
}
