import React, { useState, useEffect } from 'react';
import { Box } from 'theme-ui';
import Navigation from '@components/Navigation';
import Drawer from '@components/Drawer';
import useSiteMetadata from '@helpers-blog/useSiteMetadata';

const generateStyles = (isHomePage) => ({
  desktopMenu: {
    display: ['none', null, 'block'],
    a: {
      color: isHomePage ? 'white !important' : 'unset',
    },
  },
  mobileMenu: {
    display: ['block', null, 'none'],
  },
  desktopMenuWrapper: {
    justifyContent: 'flex-end',
  },
});

export const HeaderMenu = ({ mobileMenu = {} }) => {
  const { headerMenu } = useSiteMetadata();
  const [isHomePage, setIsHomePage] = useState(true);
  const styles = generateStyles(isHomePage);

  useEffect(() => {
    const checkIsHomePage = () => {
      const isHome =
        typeof window !== 'undefined' && window.location.pathname === '/'; // Check if window object is available and the current URL is the home page
      setIsHomePage(isHome);
    };

    checkIsHomePage(); // Call the function initially

    if (typeof window !== 'undefined') {
      const handleRouteChange = () => {
        checkIsHomePage();
      };

      window.addEventListener('popstate', handleRouteChange);

      return () => {
        window.removeEventListener('popstate', handleRouteChange);
      };
    }
  }, []);

  if (typeof window === 'undefined') {
    return null; // Return null during server-side rendering
  }

  const desktopMenuNav = (
    <Navigation
      variant="horizontal"
      items={headerMenu}
      wrapperStyle={styles.desktopMenuWrapper}
      sx={styles.desktopMenu}
    />
  );

  const mobileMenuNav = (
    <Drawer>
      <Navigation
        variant="vertical"
        headingProps={{ variant: 'h3' }}
        items={[
          {
            title: 'Main Menu',
            items: headerMenu,
          },
          mobileMenu,
        ]}
      />
    </Drawer>
  );

  return (
    <>
      <Box sx={styles.desktopMenu}>{desktopMenuNav}</Box>
      <Box sx={styles.mobileMenu}>{mobileMenuNav}</Box>
    </>
  );
};
