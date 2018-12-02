require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const query = `{
  allMarkdownRemark {
    edges {
      node {
        objectID: id,
        fields {
          slug
        }
        internal {
          content
        }
        frontmatter {
          title
        }
        excerpt
      }
    }
  }
}`

const transformer = ({ data }) => {
  return data.allMarkdownRemark.edges.map(({ node }) => node);
};

module.exports = {
  siteMetadata: {
    title: 'MSPACE',
    author: 'Song Min Suk',
    description: '하는 것들을 적는 공간.',
    siteUrl: 'https://mssuk.github.io/MSPACE/',
  },
  pathPrefix: '/MSPACE',
  plugins: [
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID || "",
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY || "",
        indexName: process.env.ALGOLIA_INDEX_NAME || "",
        queries : [{query, transformer}]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-130217083-1`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    'gatsby-plugin-sass',
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
