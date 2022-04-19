import React, { FC } from 'react'
import { PageProps } from 'gatsby'

const IndexPage: FC<PageProps> = () => {
  return (
    <main>
      <title>Home Page</title>
      <h1>
        Congratulations — you just made a Gatsby site!
        <span role="img" aria-label="Party popper emojis">
          🎉🎉🎉
        </span>
      </h1>
    </main>
  )
}

export default IndexPage
