const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')


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
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    category
                  }
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

         _.each(posts, (post, index) => {
           const previous = index === posts.length - 1 ? null : posts[index + 1].node;
           const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })

          
          let categories = []
          if (_.get(post, 'node.frontmatter.category')) {
            categories = categories.concat(post.node.frontmatter.category)

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
        })

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