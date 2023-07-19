import React from 'react'
import { Layout, Stack, Hero, Main, Sidebar, PreFooter } from '@layout'
import CardList from '@components/CardList'
import Sticky from '@components/Sticky'
import Divider from '@components/Divider'
import Pagination from '@components/Pagination'
import Seo from '@widgets/Seo'
import Categories from '@widgets/Categories'
import Tags from '@widgets/Tags'
import NewsletterCompact from '@widgets/NewsletterCompact'
import Social from '@widgets/Social'
import HeroComponent from '../components/Hero/Hero'
import { useBlogTags, useBlogCategories } from '@helpers-blog'

const Posts = ({ data: { paginatedPosts = {} }, ...props }) => {
  const { pageContext: { services = {}, basePath } = {} } = props
  const tags = useBlogTags()
  const categories = useBlogCategories()

  return (
    <Layout {...props}>
      <Seo title='Home' />
      <Hero sx={{ bg: `contentBg` }}>
        <HeroComponent {...props} />
      </Hero>
      <Hero
        pt={4}
        pb={5}
        sx={{
          background: t =>
            `linear-gradient(
              0deg,
              ${t.colors.omegaLighter},
              ${t.colors.background}
            )`
        }}
      >
        <Divider space={3} />
        <Box sx={{ position: `relative`, zIndex: 3 }}>
          <Box sx={{ display: [`none`, `block`] }}>
            <Categories
              categories={categories}
              variant='horizontal'
              omitTitle
            />
            <Divider />
          </Box>
          <CardList
            nodes={featuredPosts.nodes}
            variant={['horizontal-hero']}
            limit={3}
            omitFooter
            slider
            autoPlay
            fade
            arrows={false}
            controlPosition='bottom'
            ref={sliderRef}
            loading='eager'
          />
          <Box sx={{ display: [`none`, null, `block`] }}>
            <Divider />
            <CardList
              nodes={featuredPosts.nodes}
              variant={['horizontal-md', 'horizontal-aside']}
              limit={3}
              columns={[1, 0, 3]}
              omitCategory
              asNavFor={sliderRef}
              loading='eager'
            />
          </Box>
        </Box>
      </Hero>
      <Divider />
      <Stack>
        <Main>
          <CardList
            variant={['horizontal-md', 'horizontal']}
            title='Recently Published'
            nodes={paginatedPosts.nodes}
            columns={[1]}
          />
        </Main>
        <Sidebar>
          <Categories categories={categories} />
          <Divider />
          <Tags tags={tags} />
          <Divider />
          <Social />
          <Sticky>
            {services.mailchimp && (
              <>
                <Divider />
                <NewsletterCompact />
              </>
            )}
          </Sticky>
        </Sidebar>
      </Stack>
      <Divider />
      <PreFooter>
        <Pagination {...paginatedPosts.pageInfo} basePath={basePath} />
      </PreFooter>
    </Layout>
  )
}

export default Posts
