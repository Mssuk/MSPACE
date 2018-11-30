import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'

import Layout from '../components/Layout'
import BackwardButton from '../components/BackwardButton'
import { rhythm, scale } from '../utils/typography'

if (typeof window === 'undefined') {
  global.window = {}
}
const blogPost = ({data}) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = post.excerpt
  return (
    
      <Layout location={window.location}>

        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
      <div>
          <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
            color: `#bbb`,
          }}
        >
          {post.frontmatter.date}
        </p>
          <div dangerouslySetInnerHTML={{__html:post.html}} />
      </div>
      <BackwardButton />
      </Layout>
  )
}

export default blogPost;

export const query = graphql`
  query($slug: String!){
      site{
        siteMetadata {
          title
          author
        }
      }
      markdownRemark(fields: { slug: {eq: $slug } }){
          id
          excerpt
          html
          frontmatter{
              title
              date(formatString: "MMMM DD, YYYY")
          }
      }
  }
`

// class BlogPostTemplate extends React.Component {
//   render() {
//     const post = this.props.data.markdownRemark
//     const siteTitle = get(this.props, 'data.site.siteMetadata.title')
//     const siteDescription = post.excerpt
//     const { previous, next } = this.props.pageContext

//     return (
//       <Layout location={this.props.location} title={siteTitle}>
//         <Helmet
//           htmlAttributes={{ lang: 'en' }}
//           meta={[{ name: 'description', content: siteDescription }]}
//           title={`${post.frontmatter.title} | ${siteTitle}`}
//         />
//         <h1>{post.frontmatter.title}</h1>
//         <p
//           style={{
//             ...scale(-1 / 5),
//             display: 'block',
//             marginBottom: rhythm(1),
//             marginTop: rhythm(-1),
//           }}
//         >
//           {post.frontmatter.date}
//         </p>
//         <div dangerouslySetInnerHTML={{ __html: post.html }} />
//         <hr
//           style={{
//             marginBottom: rhythm(1),
//           }}
//         />
//         <Bio />

//         <ul
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//             listStyle: 'none',
//             padding: 0,
//           }}
//         >
//           <li>
//             {
//               previous &&
//               <Link to={previous.fields.slug} rel="prev">
//                 ← {previous.frontmatter.title}
//               </Link>
//             }
//           </li>
//           <li>
//             {
//               next &&
//               <Link to={next.fields.slug} rel="next">
//                 {next.frontmatter.title} →
//               </Link>
//             }
//           </li>
//         </ul>
//       </Layout>
//     )
//   }
// }

// export default BlogPostTemplate

// export const pageQuery = graphql`
//   query BlogPostBySlug($slug: String!) {
//     site {
//       siteMetadata {
//         title
//         author
//       }
//     }
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       id
//       excerpt
//       html
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//       }
//     }
//   }
// `
