import React from 'react'
import { Layout, Stack, Main, Sidebar } from '@layout'
import PageTitle from '@components/PageTitle'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'
import ContactForm from '@widgets/ContactForm'
import ContactInfo from '@widgets/ContactInfo'
import Commitment from '@widgets/Commitment'

const PageContact = props => (
  <Layout {...props}>
    <Seo title='Contact' />
    <Divider />
    <Stack>
      <Main>
        <PageTitle
          header="Have a post idea? Let's talk!"
          subheader='As a writer or contributor to Salesforce Stack, you have the opportunity to showcase your expertise, contribute to the knowledgebase, and connect with a vibrant community of fellow Salesforce enthusiasts.'
        />
        <Divider />
        <ContactForm />
      </Main>
      <Sidebar>
        <Commitment />
        <Divider />
        <ContactInfo />
      </Sidebar>
    </Stack>
  </Layout>
)

export default PageContact
