import { useStaticQuery, graphql } from 'gatsby'

export const useRecentPosts = () => {
  const { recentPosts } = useStaticQuery(recentPostsQuery)
  return recentPosts.nodes || null
}

const recentPostsQuery = graphql`
  query allRecentArticleQuery(
    $includeExcerpt: Boolean! = true
    $includeTimeToRead: Boolean! = true
    $imageQuality: Int! = 75
    $currentDate: Date! = "${new Date().toISOString()}"
  ) {
    recentPosts: allArticle(
      filter: {
        private: { ne: true },
        draft: { ne: true },
        date: { lte: $currentDate }
      }
      sort: { date: DESC }
      limit: 6
    ) {
      nodes {
        ...ArticlePreview
        ...ArticleThumbnailRegular
      }
    }
  }
`
