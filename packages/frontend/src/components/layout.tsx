/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from 'react'
import { Flex, useColorMode } from 'theme-ui'

import Header from './header'
import Canvas from './Canvas'

require('typeface-inter')

const Layout = ({ children }) => {
  const [colorMode, setColorMode] = useColorMode()

  // useEffect(() => {
  //   setColorMode('dark')
  // }, [])

  return (
    <Flex
      sx={{
        margin: 0,
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Canvas>{children}</Canvas>
    </Flex>
  )
}

export default Layout
