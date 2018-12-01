import React, { Component } from 'react';
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Category from '../components/Category'
import '../assets/css/mainCss.css'

class categoryTemplate extends Component {
    render() {
        const { title } = this.props.data.site.siteMetadata
        const { category } = this.props.pageContext
        return (
          <div>
            <Layout>
            <div>
              <Helmet title={`${category} - ${title}`} />
              <Category {...this.props} />
            </div>
          </Layout>
          </div>
        );
    }
}

export default categoryTemplate;


export const pageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {
          category: { eq: $category }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
          }
          excerpt
        }
      }
    }
  }
`
