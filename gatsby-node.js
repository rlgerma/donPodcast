const path = require("path")

const { GraphQLBoolean } = require("gatsby/graphql")

// Add `published` property to MarkdownRemark nodes to indicate if this markdown is to be published.
module.exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if ("MarkdownRemark" === type.name) {
    return {
      published: {
        type: GraphQLBoolean,
        resolve: ({ frontmatter }) => {
          // Always set `published` field to true when not in production mode
          // or if frontmatter.draft is not set.
          if (
            process.env.NODE_ENV !== "production" ||
            frontmatter.draft == undefined
          ) {
            return true
          }

          return !frontmatter.draft
        },
      },
    }
  }
  return {}
}

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // For all "MarkdownRemark" nodes of type "post", add a slug to the node based
  // on the filename
  if (node.internal.type === "MarkdownRemark") {
    if (node.frontmatter.type === "post") {
      const slug = path.basename(node.fileAbsolutePath, ".md")

      createNodeField({
        node,
        name: "slug",
        value: slug,
      })
    }
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const episodesPostTemplate = path.resolve(
    "./src/templates/episodes-post-template.jsx"
  )
  const episodesListTemplate = path.resolve(
    "./src/templates/episodes-list-template.jsx"
  )
  const episodesPostsByTagTemplate = path.resolve(
    "./src/templates/episodes-posts-by-tag-template.jsx"
  )
  const episodesPostsByAuthorTemplate = path.resolve(
    "./src/templates/episodes-posts-by-author-template.jsx"
  )

  const res = await graphql(`
    query {
      postsRemark: allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" } }
          published: { eq: true }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" } }
          published: { eq: true }
        }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
      authorsGroup: allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" } }
          published: { eq: true }
        }
      ) {
        group(field: frontmatter___author) {
          fieldValue
          totalCount
        }
      }
      siteMetaData: site {
        siteMetadata {
          episodesPostsPerPage
        }
      }
    }
  `)

  const posts = res.data.postsRemark.edges
  const postsPerPage = res.data.siteMetaData.siteMetadata.episodesPostsPerPage
  const numEpisodesListPages = Math.ceil(posts.length / postsPerPage)
  const tags = res.data.tagsGroup.group
  const authors = res.data.authorsGroup.group

  // Create episodes post detail pages
  // Example: /episodes/my-first-post
  posts.forEach(({ node, next, previous }) => {
    createPage({
      component: episodesPostTemplate,
      path: `/episodes/${node.fields.slug}`,
      context: {
        slug: node.fields.slug,
        prev: next, // prev = next is on purpose. in the context of the episodes post template, the next post is the one posted later, not before
        next: previous, // see above comment
      },
    })
  })

  // Create paginated episodes listing pages
  // Example: /episodes, /episodes/2, episodes/3, etc
  Array.from({ length: numEpisodesListPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/episodes` : `/episodes/${i + 1}`,
      component: episodesListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numEpisodesListPages,
        currentPage: i + 1,
      },
    })
  })

  // Create paginated episodes tag listing pages for each tag
  // Example: /episodes/tag/first-tag, /episodes/tag/first-tag/2, /episodes/tag/second-tag, etc
  tags.forEach(tag => {
    const tagName = tag.fieldValue
    const tagCount = tag.totalCount
    const numTagListPages = Math.ceil(tagCount / postsPerPage)

    Array.from({ length: numTagListPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/episodes/tags/${tagName}`
            : `/episodes/tags/${tagName}/${i + 1}`,
        component: episodesPostsByTagTemplate,
        context: {
          tag: tagName,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numTagListPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // Create paginated episodes author listing pages for each author
  // Example: /episodes/author/savannah, /episodes/author/savannah/2, /episodes/author/maya, etc
  authors.forEach(author => {
    const authorName = author.fieldValue
    const authorCount = author.totalCount
    const numAuthorListPages = Math.ceil(authorCount / postsPerPage)

    Array.from({ length: numAuthorListPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/episodes/authors/${authorName}`
            : `/episodes/authors/${authorName}/${i + 1}`,
        component: episodesPostsByAuthorTemplate,
        context: {
          author: authorName,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numAuthorListPages,
          currentPage: i + 1,
        },
      })
    })
  })
}
