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
    // Check if window object is available (client-side rendering)
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.pathname; // Get the current URL
      const isHome = currentUrl === '/'; // Adjust this condition based on your home page URL
      setIsHomePage(isHome);

      // Attach an event listener to check the home page on route changes
      const handleRouteChange = () => {
        const isHome = window.location.pathname === '/';
        setIsHomePage(isHome);
      };

      // Add event listener to route changes
      window.addEventListener('popstate', handleRouteChange);

      return () => {
        // Cleanup the event listener on component unmount
        window.removeEventListener('popstate', handleRouteChange);
      };
    }
  }, []);

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
