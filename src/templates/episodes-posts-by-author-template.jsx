import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import EpisodesList from "../components/episodes-list"
import PrevNext from "../components/prev-next"
import Button from "../components/button"

const query = graphql`
  query($author: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { type: { eq: "post" }, author: { in: [$author] } }
        published: { eq: true }
      }
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            author
            date(formatString: "MMMM Do, YYYY")
            tags
            excerpt
            image {
              childImageSharp {
                fluid(maxWidth: 750, quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            imageAlt
          }
          id
        }
      }
    }
  }
`

const Authors = ({ data, pageContext }) => {
  const { author, currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? `/episodes/authors/${author}`
      : `/episodes/authors/${author}/` + (currentPage - 1).toString()
  const nextPage = `/episodes/authors/${author}/` + (currentPage + 1).toString()

  const prevDetails = isFirst
    ? null
    : {
        linkPath: prevPage,
        linkText: "Previous Page",
      }

  const nextDetails = isLast
    ? null
    : {
        linkPath: nextPage,
        linkText: "Next Page",
      }

  return (
    <Layout
      title={`Articles by ${author} - Page ${currentPage}`}
      pathName={`/episodes/authors/${author}`}
    >
      <header className="tc">
        <h1 className="page-heading">Articles by {author}</h1>
        <div className="mt5">
          <Button linkUrl="/episodes/authors" linkText="All Authors" />
        </div>
      </header>
      <EpisodesList data={data.allMarkdownRemark} />
      <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
    </Layout>
  )
}

export default Authors
