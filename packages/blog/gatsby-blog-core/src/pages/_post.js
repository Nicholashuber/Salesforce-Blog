const queryMobileMenu = require('../utils/queryMobileMenu')

module.exports = async (
  { graphql, actions, reporter },
  pluginOptions,
  { template }
) => {
  const { createPage } = actions
  const { pageContextOptions } = pluginOptions

  pageContextOptions.mobileMenu = await queryMobileMenu({ graphql })
  pageContextOptions.currentDate = new Date().toISOString()
  const currentDate = new Date()

  const result = await graphql(`
    {
      allArticle(
        filter: { draft: { ne: true } }
        sort: [{ date: DESC }, { title: ASC }]
        limit: 1000
      ) {
        edges {
          node {
            id
            slug
            link
            date
            category {
              id
            }
            tags {
              id
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const { allArticle } = result.data
  const posts = allArticle.edges

  posts.forEach(({ node }, index) => {
    const { id, slug, category, tags, link, date } = node

    // Skip posts with future dates
    const postDate = new Date(date)
    if (postDate > currentDate) return

    if (link) return //skip creating pages for nodes linking to external sites

    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    //For querying related posts based on tags and category
    const categoryId = category && category.id
    const tagsIds = (tags && tags.map(tag => tag && tag.id)) || []
    const hasTags = tagsIds.length > 0

    createPage({
      path: slug,
      component: template,
      context: {
        id,
        categoryId,
        tagsIds,
        hasTags,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
        ...pageContextOptions
      }
    })
  })
}
