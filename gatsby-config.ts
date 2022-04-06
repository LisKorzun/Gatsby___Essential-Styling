import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: ['gatsby-plugin-styled-components', 'gatsby-plugin-react-helmet'],
}

export default config
