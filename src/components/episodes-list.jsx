import React from "react"

import EpisodesListItem from "./episodes-list-item"

import styles from "./episodes-list.module.scss"

const EpisodesList = ({ data }) => {
  return (
    <section className={styles.posts}>
      {data.edges.map(({ node }) => (
        <EpisodesListItem key={node.id} node={node} />
      ))}
    </section>
  )
}

export default EpisodesList
