<p align="center">
  <a href="https://www.gatsbyjs.com/">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="32" />
  </a>
  <a href="https://styled-components.com/">
    <img alt="TypeScript" src="https://styled-components.com/logo.png" width="32" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
    <img alt="Prettier" src="https://i.postimg.cc/t4m2sqDT/css-logo.png" height="32" />
  </a>
</p>
<h1 align="center">
  Gatsby and Essential Styling
</h1>
<p align="center">
  Brief notes that contain only essential instructions with reference to official resources
</p>

## 📋 Overview

There are some options for styling in Gatsby: Inline styles, Global CSS, CSS Modules, Styled-Components, Bootstrap, etc.
At first glance, styling of SSR app should not be so complicated since there are so many options.
However, there are cases when a simple feature can have a complex implementation, e.g. dark mode.
So the choice of styling approach could become complicated.
Personally, I would rather like CSS-in-JS approach and Styled-Components.
But it doesn't mean that using CSS-in-JS absolves you from needing to learn CSS.
No matter where you put your CSS, it behooves you to develop a mastery of the language.
There are a lot of the exciting newer developments in CSS. One of them is CSS variables _(aka Custom Properties)_. 
Their best trick is that they're reactive. When a variable's value changes, the HTML updates instantly. Using them can help resolve a lot of issues.

Let's summarize, in this starter we are focusing on the initial app structure for styling.
The fundamental strategy can also be used with any SSR app.

**Prerequisites**

- A [Gatsby site](https://github.com/LisKorzun/Gatsby___Essential-Tools) with an index page component

## 🚀 Install Styled-Components

1. **Install [Gatsby plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/) and the necessary dependencies**

   ```shell
   npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components

   # Do not forget to add @types/styled-components

   npm install @types/styled-components -D
   ```

2. **Add plugin to `gatsby-config.ts`**

   ```js
   // gatsby-config.ts

   module.exports = {
     plugins: [`gatsby-plugin-styled-components`],
   }
   ```

🔥 At this point, you can run `gatsby develop` and use styled-components.

## 🚩 Set up ThemeProvider and GlobalStyles

1. **Create `GlobalStyle.ts` in `src/styles` folder**

   ```js
   // src/styles/GlobalStyles.ts

   import { createGlobalStyle } from 'styled-components'

   const GlobalStyles = createGlobalStyle``

   export default GlobalStyles
   ```

> Inside its **[configuration files](https://www.gatsbyjs.com/docs/reference/config-files/)**, Gatsby provides a rich set of lifecycle APIs to hook into its bootstrap, build, and client runtime operations.

> **[Gatsby Browser APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/):** The file `gatsby-browser.ts` lets you respond to Gatsby-specific events within the browser, and wrap your page components in additional global components.
> The Gatsby Browser API gives you many options for interacting with the client-side of Gatsby.

> The **[wrapRootElement](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapRootElement)**
> api is designed for wrapping your core application with all of your various providers. **wrapRootElement** does not render every time the page changes,
> it’s a good fit for context providers that don’t need the page, like theme or global application state providers.

2. **Create `wrapRoot.tsx` in `src/components` folder. Add ThemeProvider and GlobalStyles**

   ```tsx
   // src/components/wrapRoot.tsx

   import React from 'react'
   import type { GatsbyBrowser } from 'gatsby'
   import { ThemeProvider } from 'styled-components'

   import { GlobalStyle } from '../styles'

   const wrapRoot: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
     /* it will be called only once in browser, when React mounts */

     return (
       <ThemeProvider theme={{}}>
         <GlobalStyle />
         {element}
       </ThemeProvider>
     )
   }

   export default wrapRoot
   ```

3. **Create `gatsby-browser.ts` in the root. Use wrapRootElement gatsby api**

   ```ts
   // gatsby-browser.ts

   import wrapRoot from './src/components/wrapRoot'

   export const wrapRootElement = wrapRoot
   ```


🔥 At this point, you can run `gatsby develop`, add some styles to `GlobalStyle.ts` and check how they are applied.

> ❗ If your consider a case when Theme or GlobalStyles can depend on a page, then the wrapPageElement api is better choice.

> The **[wrapPageElement](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement)**
> api is ideal for base layouts that every page has. It's not necessary to use this function,
> but if you don't want to have to add your base layout component to every page of your site, then using this api is a good way to save some typing.
> **wrapPageElement** renders every time the page changes, making it ideal for complex page transitions, or for stuff that need the page path.
> It’s better to use it only for providers that need the router props.

> One similarity `wrapPageElement` and `wrapRootElement` share is that they both mount only once,
> as opposed to a regular Layout component—that you use inside your pages—that will unmount every time the page changes.

4. **Create `Layout.tsx` in `src/components` folder**

   ```tsx
   // src/components/Layout.tsx

   import React, { FC } from 'react'

   const Layout: FC = ({ children, ...propsUsedByPage }) => {
     console.log(propsUsedByPage)
     // Layout receives same data as Page element will get
     // including location, path, uri, params, data, pageContext, etc

     return (
       <>
         <header>Site Name</header>
         <main>{children}</main>
         <footer>Footer</footer>
       </>
     )
   }

   export default Layout
   ```

5. **Create `wrapPage.tsx` in `src/components` folder**

   ```tsx
   // src/components/wrapPage.tsx

   import React from 'react'
   import type { GatsbyBrowser } from 'gatsby'

   import Layout from './Layout'

   const wrapPage: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
     // props provide same data to Layout as Page element will get
     // including location, data, etc - you don't need to pass it

     return <Layout {...props}>{element}</Layout>
   }

   export default wrapPage
   ```

6. **Update `gatsby-browser.ts` by adding wrapPageElement**

   ```ts
   import wrapRoot from './src/components/wrapRoot'
   import wrapPage from './src/components/wrapPage'

   export const wrapRootElement = wrapRoot
   export const wrapPageElement = wrapPage
   ```

🔥 At this point, you can run `gatsby develop`, modify the layout and check how it works.

> **[Gatsby Server Rendering APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/):**
> The file `gatsby-ssr.ts` lets you alter the content of static HTML files as they are being Server-Side Rendered (SSR) by Gatsby and Node.js.
> To use the Gatsby SSR APIs, create a file called gatsby-ssr.js in the root of your site.

> The APIs **wrapPageElement** and **wrapRootElement** exist **in both the SSR and browser APIs**.
> You generally should implement the same components in both `gatsby-ssr.ts` and `gatsby-browser.ts`
> **_so that pages generated through SSR with Node.js are the same after being hydrated in the browser_**.

7. **Create `gatsby-ssr.ts` in the root**

   ```ts
   // gatsby-ssr.ts

   import wrapRoot from './src/components/wrapRoot'
   import wrapPage from './src/components/wrapPage'

   export const wrapRootElement = wrapRoot
   export const wrapPageElement = wrapPage
   ```

## 🚩 Styles folder

> Browsers apply styles to elements before you’ve written any CSS at all, and sometimes those styles vary. 
> Normalizing your CSS lets you rest assured, knowing that you have the same base layer of styles applied across all browsers.

### Normalizing your CSS

1. **Install [normalize.css](https://github.com/necolas/normalize.css/)**

   ```shell
   npm i normalize.css
   ```

2. **Import normalize.css in the `gatsby-browser.ts` file**

   ```ts
   // gatsby-browser.ts
   
   import 'normalize.css'
   ```
   
> ❗ Gatsby automatically concatenates and minifies CSS and inlines them into the <head> of your HTML files for the fastest possible page load time.
> CSS files like normalize, css variables, global typography and colors are typically imported into the site’s gatsby-browser.js file.

### CSS Variables

1. **Create `variables.css` in `src/styles` folder**

   ```css
   /* src/styles/variables.css */
   
   :root {
   --font-sans: 'Tahoma', -apple-system, system-ui, sans-serif;
   
   --color-text: #1b263b;
   --color-background: #fff;
   --color-primary: #06bcf0;
   --color-secondary: #9cacbf;
   }
   ```
  
2. **Import `variables.css` in the `gatsby-browser.ts` file:**

   ```ts
   // gatsby-browser.ts
   
   import './src/styles/variables.css'
   ```

### Global CSS

> Styles that are critical for any page it's also better to load as css, especially this is important for SSR apps.

1. **Create `global.css` in `src/styles` folder**

   ```css
   /* src/styles/global.css */

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
   ```

2. **Import `global.css` in the `gatsby-browser.ts` file:**

   ```ts
   // gatsby-browser.ts
   
   import './src/styles/global.css'
   ```

## 🚩 Fonts

> There are a lot of ways how to [add fonts to your gatsby site](https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/)
> But before you start thinking to apply amazing font to your site, just be prepared for [FOUT fighting](https://css-tricks.com/fighting-foit-and-fout-together/).
> May be, this is not so important feature...

> [Zach Leatherman](https://github.com/zachleat) did a great research on [web font loading performance](https://www.zachleat.com/web/five-whys/).
> Here is his [web font loading recipes](https://github.com/zachleat/web-font-loading-recipes), and my [favorite one](https://github.com/zachleat/web-font-loading-recipes/blob/master/fout.html). 

### Basic principles:

Font files can usually be reduced in size significantly. If your font file is over 50kb, it’s too large. In addition, fonts can block page load, so it’s important to think about reducing network calls.

1. **Prefer `woff2`. Don’t use `ttf`**

   `woff2` is a compressed font format, [supported by browsers](https://caniuse.com/woff2) used by over 95% of Internet users. 
A few legacy browsers need woff.Like using avif and webp instead of png and jpg, using the correct format can significantly cut down the amount of data sent over the network.


2. **Self-host rather than installing from an external CDN.**

   Having the font file available locally will save a trip over the network and reduce blocking time.


3. **Use Latin font subsets only**

   If creating a Latin-language site, it’s common to accidentally include font extensions (Greek, Cyrillic, Devnagari, Chinese) 
when typically you only need the Latin base set. The Google Webfonts Helper app can help you do this with free fonts.


4. **[Preload](https://caniuse.com/link-rel-preload), [prefetch](https://caniuse.com/link-rel-dns-prefetch), [preconnect](https://caniuse.com/link-rel-preconnect) ...**

   ```html
   <!-- CSS -->
   <link rel='dns-prefetch' href='//fonts.googleapis.com'>
   <!-- Gives a hint to the browser to perform a DNS lookup in the background to improve performance. -->
   <link rel="prefetch" href="(url)">
   <!-- Informs the browsers that a given resource should be prefetched so it can be loaded more quickly. -->
   
   <!-- Fonts -->
   <link rel='preconnect' href='https:// fonts.gstatic.com' crossorigin>
   <!-- Gives a hint to the browser to begin the connection handshake (DNS, TCP, TLS) -->
   <!-- in the background to improve performance. -->
   <!-- Great for cross-origin font requests -->
   
   <!-- Fonts -->
   <link rel='preload' href='/fonts/Comfortaa.woff2' as='font' type='font/woff2' crossorigin>
   <!-- Using <link rel="preload">, browsers can be informed to prefetch resources without having to execute them, -->
   <!-- allowing fine-grained control over when and how resources are loaded. -->
   <!-- Use preload for self-hosted fonts -->
   <!-- Preloading fonts from a different origin incurs connection costs at a bad time -->
   <!-- Overuse of preload will cost you in first render time -->
   <!-- Preload some, not all. Prioritization strategy: -->
   <!--     ▫️ what reflows are most likely to be the most disruptive -->
   <!--     ▫️ preload one of each family -->
   ```

5. **Use `swap`** 

   Gives the font face an extremely small block period and an infinite swap period.

   ```css
   @font-face { 
      font-display: swap;
   }
   
   /* Shows fallback font immediately, render web font whenever */
   ```

6. **Load a web font or two/three web fonts using JS: [FontFase Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/FontFace)**

   ```js
   // Make two fonts
   let font = new FontFace('Comfortaa', /* ... */);
   let fontBold = new FontFace('Comfortaa', /* ... */);
   
   // Load two
   let fonts = await Promise.all([
      font.load(),
      fontBold.load()
   ]);
   
   // Render them at the same time
   fonts.forEach(font => document.fonts.add(font));
   ```


> If you don't care about [FOUT or FOIT](https://dev.to/ibn_abubakre/font-loading-strategies-foit-and-fout-393b#:~:text=FOIT%20and%20FOUT%20are%20font,until%20the%20font%20is%20loaded.)
> here is two simple options how to load self-hosted fonts.
### Option 1. Load font as module

1. Download any [Google Font family](https://fonts.google.com/specimen/Comfortaa) to `src/assets/fonts` folder.

2. Specify your font with [@font-face CSS at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)

   ```ts
   import { createGlobalStyle } from 'styled-components'
   
   import ComfortaaRegular from '../assets/fonts/Comfortaa/Comfortaa-Regular.ttf'
   
   const GlobalStyles = createGlobalStyle`
   @font-face {
      font-family: 'Comfortaa';
      src: url(${ComfortaaRegular}) format('truetype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
   }
   `
   
   export default GlobalStyles
   ```

3. Most likely you will need to add type declaration for the font type. Create `types.ts` in `src` folder.

   ```ts
   declare module '*.ttf'
   ```

5. Update [font variable](https://github.com/LisKorzun/Gatsby___Essential-Styling/blob/master/src/styles/variables.ts) to use newly added font

   ```
   --font-sans: 'Comfortaa', -apple-system, system-ui, sans-serif;
   ```

### Option 2. Load font from static folder

1. Download any [Google Font family](https://fonts.google.com/specimen/Comfortaa) to `static/fonts` folder.
   You can create a folder named static at the root of your project. Every file you put into that folder will be copied into the public folder.
   

3. Create `fonts.css` in `src/styles` folder. Specify your font with [@font-face CSS at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)

   ```css
   /* src/styles/fonts.css */
   
   @font-face {
     font-family: 'Comfortaa';
     src: url('/fonts/Comfortaa/Comfortaa-Bold.ttf') format('truetype');
     font-weight: 700;
     font-style: normal; 
     font-display: swap;
   }
   ```
4. Import `fonts.css` in the `gatsby-browser.ts` file:

   ```ts
   // gatsby-browser.ts
   
   import './src/styles/fonst.css'
   ```

5. Update font variable to use newly added font

   > Keep in mind that none of the files in the static folder will be post-processed or minified.
   > You should take cate about caching of fonts folder forever.

## 🚩 Dark Mode

> Based on the article **[The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/)** by Josh Comeau.

### Basic principles:

1. **Use reactive CSS variables**
2. **Prepare colors for the initial page view beforehand, using [onRenderBody](https://github.com/LisKorzun/Gatsby___Essential-Styling/blob/master/gatsby-ssr.tsx) [Gatsby Server Rendering API](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#onRenderBody)**. 
3. **Create [context](https://github.com/LisKorzun/Gatsby___Essential-Styling/blob/master/src/store/ColorModeContext.tsx) for color modes, add [provider](https://github.com/LisKorzun/Gatsby___Essential-Styling/blob/master/src/components/wrapRoot.tsx)**
4. **Add the mode [toggle](https://github.com/LisKorzun/Gatsby___Essential-Styling/blob/master/src/components/ColorModeToggle.tsx)**

---

Learn more about

- [Built-in CSS Support](https://www.gatsbyjs.com/docs/how-to/styling/built-in-css/)
- [Recipes: Styling with CSS](https://www.gatsbyjs.com/docs/recipes/styling-css/)
- [Tutorial: Styled Components](https://www.gatsbyjs.com/docs/how-to/styling/styled-components/)
- [Official Plugin: gatsby-plugin-styled-components](https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/)
- [NPM: gatsby-plugin-styled-components](https://www.npmjs.com/package/gatsby-plugin-styled-components)
- [Improving Site Performance](https://www.gatsbyjs.com/docs/how-to/performance/improving-site-performance)
