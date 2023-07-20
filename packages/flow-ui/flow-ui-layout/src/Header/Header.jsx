import React, { useContext } from 'react'
import { Container, Box, Flex } from 'theme-ui'
import pageContextProvider from '@helpers/pageContextProvider'
import Search from '@widgets/Search'
import { HeaderLogo } from './Header.Logo'
import { HeaderMenu } from './Header.Menu'
import { HeaderColorMode } from './Header.ColorMode'
import { useLocation } from '@reach/router'; // Import useLocation hook from reach/router


const styles = {
  wrapper: {
    position: `relative`,
    bg: `headerBg`
  },
  container: {
    position: `relative`,
    zIndex: 10
  },
  logoContainer: {
    flexBasis: [`full`, null, `1/3`]
  },
  searchContainer: {
    flexBasis: [`auto`, null, `1/3`],
    minWidth: `auto`,
    order: [3, null, `unset`],
    mx: 3
  },
  menuContainer: {
    flexBasis: [`auto`, null, `1/3`],
    minWidth: `auto`,
    order: [4, null, `unset`]
  },
  colorModeContainer: {
    minWidth: `auto`,
    order: [2, null, `unset`]
  },
  ayo777j: {
    position: `absolute`,
    left: `0`,
    top: `0`,
    zIndex: `999`,
    width: `100%`,
    height: `auto`,
    backgroundColor: `transparent`,
  }
}

export const Header = ({ children }) => {
  const context = useContext(pageContextProvider)

  const { services, mobileMenu, darkMode } = context.pageContext

  const algolia = services && services.algolia
  console.log('context.pageContext');
  console.log(context.pageContext);
  const location = useLocation(); // Get the location object from @reach/router
  const isHomePage = location.pathname == '/'; // Update this with your home page URL or logic
  console.log('isHomePage');
  console.log(isHomePage);

  return (
    <Box id="ay782" style={isHomePage ? {
      position: 'absolute',
      left: '0',
      top: '0',
      zIndex: '999',
      width: '100%',
      height: 'auto',
      backgroundColor: 'transparent',
    } : null} sx={styles.wrapper}>
      <Container variant='compact' sx={styles.container}>
        <Flex variant='layout.header'>
          <Box sx={styles.logoContainer}>
            <HeaderLogo />
          </Box>
          <Box sx={styles.searchContainer}>{algolia && <Search />}</Box>
          <Box sx={styles.menuContainer}>
            <HeaderMenu mobileMenu={mobileMenu} />
          </Box>
          <Box sx={styles.colorModeContainer}>
            {darkMode && <HeaderColorMode />}
          </Box>
        </Flex>
      </Container>
      {children}
    </Box>
  )
}
