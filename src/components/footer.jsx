import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { FaTwitter, FaSoundcloud } from "react-icons/fa"

import styles from "./footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            instagram
            twitter
          }
          mailchimpUrl
        }
      }
    }
  `)

  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.footerColumnName}>
          <span className={styles.name}>Double or Nothing</span>
        </div>
        <div className={styles.footerColumnLinks}>
          <Link to="/" className={styles.navItem}>
            home
          </Link>

          <Link to="/about" className={styles.navItem}>
            about
          </Link>
          <hr />
          <div>
            <a
              href={data.site.siteMetadata.mailchimpUrl}
              target="__blank"
              className="nav-link mh3"
            >
              subscribe
            </a>
            |
            <a href="/rss.xml" className="nav-link mh3">
              rss
            </a>
            |
            <a href="/sitemap.xml" className="nav-link mh3">
              sitemap
            </a>
          </div>
        </div>
        <div className={styles.footerColumnSocial}>
          <a
            href={`https://www.instagram.com/${data.site.siteMetadata.social.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSoundcloud className="icon" alt="soundcloud icon link" />
          </a>
          <a
            href={`https://www.twitter.com/${data.site.siteMetadata.social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="icon" alt="twitter icon link" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Footer
