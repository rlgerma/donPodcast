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
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/865529452&color=%23f7a9e3&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
          ></iframe>
          <div
            style={{
              fontSize: "10px",
              color: "#cccccc",
              lineBreak: "anywhere",
              wordBreak: "normal",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontFamily:
                "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
              fontWeight: "100",
            }}
          >
            <a
              href="https://soundcloud.com/user-293752257"
              title="doubleornothing"
              target="_blank"
              style={{ color: "#cccccc", textDecoration: "none" }}
            ></a>
            <a
              href="https://soundcloud.com/user-293752257/episode-one-return-of-the-chinese-quantum-superfriends"
              title="Episode One - Return of the Chinese quantum Superfriends"
              target="_blank"
              style={{ color: "#cccccc", textDecoration: "none" }}
            ></a>
          </div>
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
