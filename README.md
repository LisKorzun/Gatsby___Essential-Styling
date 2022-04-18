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
However, there are cases when a simple feature can have a complex implementation, e.x. freaking dark mode.
So the choice of styling approach could become complicated.
Personally, I would rather like CSS-in-JS approach and Styled-Components.
But it doesn't mean that using CSS-in-JS absolves you from needing to learn CSS.
No matter where you put your CSS, it behooves you to develop a mastery of the language.
There are a lot of the exciting newer developments in CSS. One of them is CSS variables _(aka Custom Properties)_.
Using them can help resolve a lot of issues.

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
   // Copy the snippet below to the newly created GlobalStyle.js file

   import { createGlobalStyle } from 'styled-components'

   const GlobalStyles = createGlobalStyle`
   
   // Here we are going to add global styles
   
   `

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
   // Copy the snippet below to the newly created wrapRoot.tsx file

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
   // Copy the snippet below to the newly created gatsby-browser.ts file

   import wrapRoot from './src/components/wrapRoot'

   export const wrapRootElement = wrapRoot
   ```

🔥 At this point, you can run `gatsby develop`, add some styles to `GlobalStyle.ts` and check how they are applied.

> The **[wrapPageElement](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement)**
> api is ideal for base layouts that every page has. It's not necessary to use this function,
> but if you don't want to have to add your base layout component to every page of your site, then using this api is a good way to save some typing.
> **wrapPageElement** renders every time the page changes, making it ideal for complex page transitions, or for stuff that need the page path.
> It’s better to use it only for providers that need the router props.

> One similarity `wrapPageElement` and `wrapRootElement` share is that they both mount only once,
> as opposed to a regular Layout component—that you use inside your pages—that will unmount every time the page changes.

4. **Create `Layout.tsx` in `src/components` folder**

   ```tsx
   // Copy the snippet below to the newly created Layout.tsx file

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
   // Copy the snippet below to the newly created wrapPage.tsx file

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
   // Copy gatsby-browser.ts to the newly created gatsby-ssr.ts file

   import wrapRoot from './src/components/wrapRoot'
   import wrapPage from './src/components/wrapPage'

   export const wrapRootElement = wrapRoot
   export const wrapPageElement = wrapPage
   ```

## 🚩 Styles folder

> Browsers apply styles to elements before you’ve written any CSS at all, and sometimes those styles vary. 
> Normalizing your CSS lets you rest assured, knowing that you have the same base layer of styles applied across all browsers.

1. **Create `normalize.ts` in `src/styles` folder, copy [normalize](https://raw.githubusercontent.com/necolas/normalize.css/master/normalize.css)**

   ```ts
   import { css } from 'styled-components'
   
   const normalize = css`
   
   /* copy normalize.css here */
   
   `
   
   export default wrapPage
   ```

2. **Create `variables.ts` in `src/styles` folder**

   ```ts
   import { css } from 'styled-components'
   
   const variables = css`
    :root {
      --font-sans: 'Tahoma', -apple-system, system-ui, sans-serif;
      
      --color-text: #1b263b;
      --color-background: #fff;
      --color-primary: #06bcf0;
      --color-secondary: #9cacbf;
   }
   `
   
   export default variables
   ```

3. **Add `variables` and `normalize` styles to GlobalStyle**

   ```ts
   import variables from './variables'
   import normalize from './normalize'
   
   const GlobalStyles = createGlobalStyle`
     ${normalize};
     ${variables};
   
     /* Put your global styles here or create base.ts file*/
     body {
       font-family: var(--font-sans);
       color: var(--color-text);
       background-color: var(--color-background);
     }  
   `
   ```
  
4. **Create theme.ts file with empty object and provide this object to ThemeProvider**
   
🔥 At this point, you have essential structure of styles folder.

## 🚩 Fonts

> There are a lot of ways how to add fonts to your gatsby site: 
> use [gatsby-plugin-web-font-loader](https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/#gatsby-plugin-web-font-loader),
> use [Web Font Loader with Typekit](https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/#how-to-use-web-font-loader-with-typekit),
> self-host [Google Fonts with Fontsource](https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/#self-host-google-fonts-with-fontsource).
> Here I'd like to mention how to add local fonts since [having the font file available locally](https://www.gatsbyjs.com/docs/how-to/performance/improving-site-performance/#step-3-optimize-fonts) will save a trip over the network and reduce blocking time.


1. **Download any [Google Font family](https://fonts.google.com/specimen/Comfortaa) to your project**

   Let's download _Comfortaa_ font family and store it in `static/fonts/Comfortaa` folder.

2. **Create `fonts.ts` in `styles` folder. Example is [here](https://github.com/LisKorzun/Gatsby___Essential-Styling/blob/master/src/styles/fonts.ts)**

3. **Import and add `fonts` to GlobalStyle**

4. **Create `types.ts` in `src` folder. Add type declaration for the font type**

   ```ts
   declare module '*.ttf'
   ```

5. **Update font variable to use newly added font**

   ```
   --font-sans: 'Comfortaa', 'Tahoma', -apple-system, system-ui, sans-serif;
   ```

🔥 If you faced with Web Font flickering on load, you can [preload only essential fonts](https://github.com/LisKorzun/Gatsby___Essential-Styling/blob/master/src/components/Head.tsx) with Helmet plugin.


---

Learn more about

- [Built-in CSS Support](https://www.gatsbyjs.com/docs/how-to/styling/built-in-css/)
- [Recipes: Styling with CSS](https://www.gatsbyjs.com/docs/recipes/styling-css/)
- [Tutorial: Styled Components](https://www.gatsbyjs.com/docs/how-to/styling/styled-components/)
- [Official Plugin: gatsby-plugin-styled-components](https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/)
- [NPM: gatsby-plugin-styled-components](https://www.npmjs.com/package/gatsby-plugin-styled-components)
-
