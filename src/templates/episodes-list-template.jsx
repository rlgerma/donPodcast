import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import EpisodesList from "../components/episodes-list"
import PrevNext from "../components/prev-next"

import styles from "./episodes-list-template.module.scss"

const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "post" } }, published: { eq: true } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
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

const EpisodesListTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? "/episodes"
      : "/episodes/" + (currentPage - 1).toString()
  const nextPage = "/episodes/" + (currentPage + 1).toString()

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
    <Layout title={`episodes - Page ${currentPage}`} pathName="/episodes">
      <header className={styles.header}>
        <h1 className={styles.title}>episodes</h1>
      </header>
      <EpisodesList data={data.allMarkdownRemark} />
      <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
    </Layout>
  )
}

export default EpisodesListTemplate
