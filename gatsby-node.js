const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const createPaginatedPages = require("gatsby-paginate");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const categoryTemplate = path.resolve(
      './src/templates/category-template.js'
    )

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              filter: { frontmatter: { draft: { ne: true } } }
              sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  frontmatter{
                    title
                    date(formatString:"DD MMMM, YYYY")
                    category
                  }
                  fields {
                    slug
                    categorySlug
                  }
                  frontmatter {
                    title
                    category
                  }
                  excerpt
                }
              }
            }
          }
        `

      ).then(result => {

        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        
        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;
        
        
        createPaginatedPages({
          edges: posts,
          createPage: createPage,
          pageTemplate: "./src/templates/index.js",
          pageLength: 10 , // This is optional and defaults to 10 if not used
          pathPrefix: "", // This is optional and defaults to an empty string if not used
        });

        //  _.each(posts, (post, index) => {
        //    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        //    const next = index === 0 ? null : posts[index - 1].node;

        posts.map(({node}) =>{
          createPage({
            path: node.fields.slug,
            component: blogPost,
            context: {
              slug: node.fields.slug
            }
          });

          let categories = []
          if (_.get(node, 'frontmatter.category')) {
            categories = categories.concat(node.frontmatter.category)
          categories = _.uniq(categories)
          _.each(categories, category => {
            const categoryPath = `/categories/${_.kebabCase(category)}/`
      
            createPage({
              path: categoryPath,
              component: categoryTemplate,
              context: { category },
            })
          })
  
            }
 
        });
      
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    
  if (typeof node.frontmatter.category !== 'undefined') {
    const categorySlug = `/categories/${_.kebabCase(
      node.frontmatter.category
    )}/`
    createNodeField({ node, name: 'categorySlug', value: categorySlug })
  }

  }
}