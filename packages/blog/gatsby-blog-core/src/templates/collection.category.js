import { graphql } from 'gatsby'
import Collection from '../containers/Collection'

export default Collection

export const pageQuery = graphql`
  query allArticleByCategoryQuery(
    $skip: Int!
    $limit: Int!
    $slug: String!
    $includeExcerpt: Boolean!
    $includeTimeToRead: Boolean!
    $imageQuality: Int!
    $currentDate: Date!
  ) {
    collectionInfo: articleCategory(slug: { eq: $slug }) {
      id
      name
      slug
      description
    }
    posts: allArticle(
      filter: {
        private: { ne: true }
        draft: { ne: true }
        category: { slug: { eq: $slug } }
        date: { lte: $currentDate }
      }
      sort: { date: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...ArticlePreview
        ...ArticleThumbnailRegular
      }
      ...ArticlePagination
    }
  }
`
