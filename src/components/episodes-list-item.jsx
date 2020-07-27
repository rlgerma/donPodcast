import React from "react"
import Img from "gatsby-image"

import styles from "./episodes-list-item.module.scss"

const EpisodesListItem = ({ node }) => {
  return (
    <div key={node.id}>
      <div className={styles.post}>
        <div className={styles.postColumn}>
          <h2 className={styles.title}>{node.frontmatter.title}</h2>
          <p className={styles.subtitle}>
            by {node.frontmatter.author} on {node.frontmatter.date}
          </p>
          {node.frontmatter.tags.length > 0 && (
            <p className={styles.tags}>
              tags: {node.frontmatter.tags.join(", ")}
            </p>
          )}
          <p>{node.frontmatter.excerpt}</p>
        </div>
        <div className={styles.postColumn}>
          <Img
            fluid={node.frontmatter.image.childImageSharp.fluid}
            alt={node.frontmatter.imageAlt}
          />
        </div>
      </div>
    </div>
  )
}

export default EpisodesListItem
