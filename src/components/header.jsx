import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { FaInstagram, FaTwitter, FaSoundcloud } from "react-icons/fa"

import styles from "./header.module.scss"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      siteMetadata: site {
        siteMetadata {
          social {
            instagram
            twitter
          }
        }
      }
    }
  `)

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <nav className={styles.navMain}>
          <span>
            <Link to="/" className={styles.navHomeLink}>
              Double or Nothing
            </Link>
          </span>

          <div className={styles.navItemList}>
            <Link
              to="/"
              className={styles.navItem}
              activeClassName={styles.navItemActive}
            >
              home
            </Link>

            <Link
              to="/about"
              className={styles.navItem}
              activeClassName={styles.navItemActive}
            >
              about
            </Link>
            <a
              href={`${data.siteMetadata.siteMetadata.social.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml3 ml4-l"
            >
              <FaSoundcloud className="icon" alt="soundloud icon link" />
            </a>
            <a
              href={`https://www.twitter.com/${data.siteMetadata.siteMetadata.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml3 ml4-l"
            >
              <FaTwitter className="icon" alt="twitter icon link" />
            </a>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
