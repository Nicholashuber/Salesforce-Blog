module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {}
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-KHKWH0EPB2", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          //respectDNT: true,
          // Avoids sending pageview hits from custom paths
          //exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          //origin: "YOUR_SELF_HOSTED_ORIGIN",
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          site {
            siteMetadata {
              siteUrl
            }
          }
          allArticle {
            nodes {
              slug
              date
            }
          }
        }
        `,
        resolveSiteUrl: ({site}) => site.siteMetadata.siteUrl,
        resolvePages: ({ allSitePage: { nodes: allPages }, allArticle: { nodes: allArticles } }) => {
          const articleMap = allArticles.reduce((acc, article) => {
            if (article.slug) {
              acc[article.slug] = article;
            }
            return acc;
          }, {});

          return allPages.map(page => {
            return {
              ...page,
              ...articleMap[page.path]
            };
          });
        },
        serialize: ({ path, date }) => {
          let entry = {
            url: path,
            changefreq: 'daily',
            priority: 0.7
          };

          // Add lastmod if we have a date
          if (date) {
            entry.lastmod = date;
          }

          return entry;
        },
        output: '/',
      }
    },
    {
      /////resolve: '@elegantstack/gatsby-theme-flexiblog-science',
      resolve: '@elegantstack/gatsby-theme-flexiblog-agency',
      options: {
        // Add theme options here. Check documentation for available options.
        siteUrl: process.env.URL || process.env.VERCEL_URL,
        sources: {
          local: true
        }
      }
    }
  ],
  siteMetadata: {
    //General Site Metadata
    title: 'SalesforceStack Blog',
    siteUrl: process.env.URL || process.env.VERCEL_URL,
    name: 'SalesforceStack',
    description: 'Explore the world of Salesforce with expert insights, code examples, and community contributions. Your one-stop hub for everything Salesforce.',
    address: 'New York, NY',
    email: 'email@example.com',
    phone: '+1 (888) 888-8888',

    //Site Social Media Links
    social: [
      {
        name: 'Github',
        url: 'https://github.com/Nicholashuber'
      },
      {
        name: 'Twitter',
        url: '#'
      },
      {
        name: 'Instagram',
        url: '#'
      }
    ],

    //Header Menu Items
    headerMenu: [
      {
        name: 'Home',
        slug: '/'
      },
      {
        name: 'Our Team',
        slug: '/authors'
      },
      {
        name: 'Contact',
        slug: '/contact'
      }
    ],

    //Footer Menu Items (2 Sets)
    footerMenu: [
      {
        title: 'Quick Links',
        items: [
          {
            name: 'Advertise with us',
            slug: '/contact'
          },
          {
            name: 'About Us',
            slug: '/about'
          },
          {
            name: 'Contact Us',
            slug: '/contact'
          }
        ]
      },
      {
        title: 'Legal Stuff',
        items: [
          {
            name: 'Privacy Notice',
            slug: '/'
          },
          {
            name: 'Cookie Policy',
            slug: '/'
          },
          {
            name: 'Terms Of Use',
            slug: '/'
          }
        ]
      }
    ]
  }
}
