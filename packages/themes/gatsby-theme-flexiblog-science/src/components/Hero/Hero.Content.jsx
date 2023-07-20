import React from 'react'
import { Link } from 'gatsby'
import { Button, Box, Heading, Text } from 'theme-ui'

/**
 * Shadow me to add your own content
 */

const styles = {
  author: {
    display: `inline-block`,
    color: `alpha`
  },
  occupation: {
    mb: 4
  },
  specialty: {
    color: `text`,
    mb: 4
  }
}

export default () => (
  <>
    <Heading className="ayo2-container" variant='h1' style={{paddingTop2: `77px`,marginTop: `revert`,
    paddingTop: `137px`}}>
      <Text style={{color:`white`}}>Build with the Salesforce Ecosystem</Text>
    </Heading>
    <Heading variant='h3' style={{color:`white`,paddingBottom: `60px`}} sx={styles.specialty}>
    Unleash Success with Salesforce Stack: Admin & Dev Tips, Integration Insights. Boost Your Salesforce Journey Now!
    </Heading>
    <style>
          {`
          @media (max-width: 767px) {
            .ayo2-container {
              font-size: 40px;
            }
          }

          @media (min-width: 768px) {
            .ayo2-container {
              font-size: 61px;
            }
          }
          `}
        </style>
    {/*<Box variant='buttons.group' style={{paddingBottom: `184px`}}>
      <Button as={Link} to='/contact'>
        Contact Me
      </Button>
      <Button variant='white' as={Link} to='/about'>
        About Me
      </Button>
</Box>*/}
  </>
)
