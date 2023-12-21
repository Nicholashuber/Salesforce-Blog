import React from 'react'
import { Box } from 'theme-ui'//new
import { Layout, Stack, Main, Sidebar, Hero } from '@layout'
import CardList from '@components/CardList'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'
import Categories from '@widgets/Categories'
import NewsletterExpanded from '@widgets/NewsletterExpanded'
import BannerHorizontal from '@widgets/BannerHorizontal'
import BannerVertical from '@widgets/BannerVertical'

import HeroComponent from '../components/Hero/Hero'//new

import { useBlogCategories } from '@helpers-blog'

const Posts = ({
  data: { posts = {}, featuredPosts = {}, recentPosts = {} },
  ...props
}) => {
  const { pageContext: { services = {} } = {} } = props
  const categories = useBlogCategories()

  return (
    <Layout {...props}>
      <Seo title='Home' />
















      
      
      <div id="ayo777" className="ayo777-container" style={{
      backgroundImage: `url("https://i.imgur.com/KvfSwbu.png")`,
      backgroundImage2light: `url("https://i.imgur.com/OXzUGFn.png")`,
      backgroundSize: `100% 740px`,
      backgroundRepeat: `no-repeat`,
      className:`ayo777-container`,
    }}>
      <style>
          {`
          @media (max-width: 767px) {
            .ayo777-container222 {
              background-size: cover !important;
            }
          }

          @media (min-width: 768px) {
            .ayo777-container222 {
              background-size: 100% 740px;
            }
          }


          @media (max-width: 767px) {
            .ayo777-container {
              background-size: cover !important;
            }
          }

          @media (min-width: 768px) and (max-width: 2559px) {
            .ayo777-container {
              background-size: 100% 740px;
            }
          }

          @media (min-width: 2560px) {
            .ayo777-container {
              background-size: 100% 1300px !important;
            }
          }
        }
          `}
        </style>
      <Hero sx={{ bg: `` }}>
        <HeroComponent {...props} />
      </Hero>
      <div class="banner-white-shape"
      style={{
        display: `none`,
        position: `absolute`,
        left: `0`,
        bottom: `66px`,
        width: `100%`,
        zindex: `1`,
        height: `112.7%`,
      }}>
        <img src="https://i.imgur.com/KloMjnY.png" alt="image"/>
        </div>
      </div>













      


      




      
      <Stack effectProps={{ effect: false }}>
        <Categories categories={categories} variant='horizontal' omitTitle />
      </Stack>
      <Divider />
      <Stack effectProps={{ effect: false }}>
        <Main>
          <CardList
            nodes={featuredPosts.nodes}
            limit={3}
            variant='horizontal-cover'
            slider
            fade
            controlPosition='over'
            loading='eager'
            omitCategory
          />
          <Divider space={2} />
          <CardList
            nodes={recentPosts.nodes}
            limit={4}
            columns={[1, 2]}
            variant='horizontal-aside'
            loading='eager'
          />
        </Main>
        <Sidebar sx={{ pl: `3`, flexBasis: `1/4` }}>
          <BannerVertical />
        </Sidebar>
      </Stack>
      <Divider space={5} />
      {posts.group.length &&
        posts.group.map((group, index) => (
          <React.Fragment key={`${group.categoryName}.list`}>
            {index % 2 === 0 ? (
              <Stack
                title={group.categoryName}
                titleLink={group.nodes[0].category.slug}
              >
                <Main>
                  <CardList
                    nodes={group.nodes}
                    limit={3}
                    columns={[1, 1, 1, 3]}
                    variant={[
                      'horizontal-md',
                      'horizontal',
                      'horizontal',
                      'vertical'
                    ]}
                  />
                  <Divider space={2} />
                  <CardList
                    nodes={group.nodes}
                    limit={3}
                    skip={3}
                    columns={[1, 2, 3, 3]}
                    variant={['horizontal-md', 'horizontal-aside']}
                    omitMedia
                  />
                </Main>
              </Stack>
            ) : (
              <Stack
                title={group.categoryName}
                titleLink={group.nodes[0].category.slug}
                direction={['column', 'column', 'column', 'row']}
              >
                <Sidebar
                  sx={{
                    pl: 0,
                    pr: [0, null, null, 3],
                    display: [null, `flex`],
                    flexDirection: [`column`, null, null, `row`]
                  }}
                >
                  <CardList
                    nodes={group.nodes}
                    limit={1}
                    columns={[1]}
                    variant={[
                      'horizontal-md',
                      'horizontal',
                      'horizontal',
                      'vertical'
                    ]}
                    omitCategory
                  />
                </Sidebar>
                <Main
                  sx={{
                    display: [null, `flex`],
                    flexDirection: [`column`, null, null, `row`]
                  }}
                >
                  <Divider space={2} />
                  <CardList
                    nodes={group.nodes}
                    limit={3}
                    skip={1}
                    columns={[1, 1, 3, 1]}
                    variant={[
                      'horizontal-md',
                      'horizontal-md',
                      'horizontal-aside'
                    ]}
                    mediaType='icon'
                    omitCategory
                  />
                  <Divider space={2} />
                </Main>
                <Sidebar
                  sx={{
                    pl: [0, null, null, 3],
                    display: [null, `flex`],
                    flexDirection: [`column`, null, null, `row`]
                  }}
                >
                  <CardList
                    nodes={group.nodes}
                    limit={1}
                    skip={4}
                    columns={[1]}
                    variant={[
                      'horizontal-md',
                      'horizontal',
                      'horizontal',
                      'vertical'
                    ]}
                    omitCategory
                  />
                </Sidebar>
              </Stack>
            )}
            {index === 0 && (
              <>
                <Divider />
                <Stack effectProps={{ effect: false }}>
                  <BannerHorizontal />
                </Stack>
              </>
            )}
            {index !== posts.group.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      <Stack>
        <Main>
          {services.mailchimp && (
            <>
              <Divider space={5} />
              <NewsletterExpanded />
            </>
          )}
        </Main>
      </Stack>
    </Layout>
  )
}

export default Posts
