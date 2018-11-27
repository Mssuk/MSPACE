import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { css } from "react-emotion"
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

if (typeof window === 'undefined') {
  global.window = {}
}

export default ({data}) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  return (
<Layout location={window.location}>
  <Helmet
            htmlAttributes={{ lang: 'en' }}
            meta={[{ name: 'description', content: siteDescription }]}
            title={siteTitle}
          />
  <div>

      <h4>{data.allMarkdownRemark.totalCount} 개의 포스트</h4>

  {data.allMarkdownRemark.edges.map(({node}) =>{
    
    return (
      <div key= {node.fields.slug}>
      <h3
          className={css`
          margin-bottom: ${rhythm(1/4)};
      `}
      >
      <Link 
          to = {node.fields.slug}
          className={css`
          text-decoration: none;
          color: inherit;
          box-shadow: none;
      `
      }
      >
      {node.frontmatter.title}{" "}
      </Link>
      </h3>
      <small 
       className={css`
       color:#bbb;
       `}
       >
      {node.frontmatter.date}</small>
      <p>{node.excerpt}</p>

      </div>
  )})}
  </div>
  </Layout>
  )
}


export const query = graphql`

  query {
    site{
      siteMetadata{
        title
        description
      }
    }
  allMarkdownRemark(sort:{fields:[frontmatter___date], order:DESC}) {
      totalCount
    edges {
      node {
        frontmatter{
          title
          date(formatString:"DD MMMM, YYYY")
        }
        fields{
            slug
        }
        excerpt
      }
    }
  }
}
`

// class BlogIndex extends React.Component {
//   render() {
//     const siteTitle = get(this, 'props.data.site.siteMetadata.title')
//     const siteDescription = get(
//       this,
//       'props.data.site.siteMetadata.description'
//     )
//     const posts = get(this, 'props.data.allMarkdownRemark.edges')

//     return (
//       <Layout location={this.props.location} title={siteTitle}>
//         <Helmet
//           htmlAttributes={{ lang: 'en' }}
//           meta={[{ name: 'description', content: siteDescription }]}
//           title={siteTitle}
//         />
//         <Bio />
//         {posts.map(({ node }) => {
//           const title = get(node, 'frontmatter.title') || node.fields.slug
//           return (
//             <div key={node.fields.slug}>
//               <h3
//                 style={{
//                   marginBottom: rhythm(1 / 4),
//                 }}
//               >
//                 <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
//                   {title}
//                 </Link>
//               </h3>
//               <small>{node.frontmatter.date}</small>
//               <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
//             </div>
//           )
//         })}
//       </Layout>
//     )
//   }
// }

// export default BlogIndex

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//         description
//       }
//     }
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//       edges {
//         node {
//           excerpt
//           fields {
//             slug
//           }
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             title
//           }
//         }
//       }
//     }
//   }
// `
