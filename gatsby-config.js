module.exports = {
  siteMetadata: {
    siteUrl: "https://doubleornothing.show",
    author: "richard germaine",
    publisher: "self",
    title: "Double or Nothing",
    description:
      "just another podcast featuring two white millenials giving luke warm takes",
    image: "/images/logo.jpg",
    bannerImage: "/images/banner.png",
    episodesPerPage: 3,
    social: {
      instagram: "https://soundcloud.com/user-293752257",
      twitter: "",
    },
    mailchimpUrl: "",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/copy/episodes/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/content/copy/pages/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/content/images/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/content/data`,
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener",
            },
          },
          {
            resolve: "gatsby-plugin-catch-links",
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  custom_elements: [{ "content:encoded": edge.node.html }],
                  date: edge.node.frontmatter.date,
                  description: edge.node.frontmatter.excerpt,
                  guid:
                    site.siteMetadata.siteUrl +
                    "/episodes/" +
                    edge.node.fields.slug,
                  url:
                    site.siteMetadata.siteUrl +
                    "/episodes/" +
                    edge.node.fields.slug,
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { frontmatter: { type: { eq: "post" } } published: { eq: true }}
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      fields { slug }
                      html
                      frontmatter {
                        title
                        author
                        date
                        tags
                        excerpt
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    "gatsby-plugin-robots-txt",
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "", // Google Analytics Tracking ID
    //     head: false,
    //     respectDNT: true,
    //     cookieDomain: "", // Your Domain
    //   },
    // },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open Sans", "Rock Salt", "Mansalva", "Lily Script One"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        // req props
        name: "Double or Nothing Podcast",
        short_name: "DON",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#F3ED02",
        display: "minimal-ui",
        // optional
        icon: "static/images/logo.jpg",
        include_favicon: false,
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        precachePages: ["", , "/about"],
      },
    },
  ],
}
