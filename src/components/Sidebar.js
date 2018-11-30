import React, { Component } from 'react';
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'
import { StaticQuery, Link, graphql } from 'gatsby'
import profileImg from '../rocket-icon-vector.png'
import { Badge } from 'reactstrap';

import { css } from "react-emotion"
import { rhythm, scale } from '../utils/typography'

class Sidebar extends Component {
    render(){
        console.log(this.props.data)
        const title = this.props.data.site.siteMetadata
        const categories = this.props.data.allMarkdownRemark.group
        return (
            <StaticQuery
            query={graphql`
                query{
                    site{
                        siteMetadata{
                            title
                        }
                    }
                    allMarkdownRemark(
                        limit: 2000
                      ) {
                        group(field: frontmatter___category) {
                          fieldValue
                          totalCount
                        }
                    }
                }
            `}
            render={data => {
            return(
              <div style={{
                 float: `left`,
                 padding: rhythm(1),
                 margin: rhythm(3),
                 
                 
                 }}>
                  <Link to="/">
                  <img src={profileImg}
                  style={{
                    margin: rhythm(1.5),
                    width: rhythm(3),
                    height: rhythm(3),
                  }} />
                  </Link>
                  <div className="categories">
                    <ul className="categories__list">
                      {data.allMarkdownRemark.group.filter(category => category.fieldValue !== "undefined")
                      .map(category => (
                        <li
                          key={category.fieldValue}
                          className="categories__list-item"
                        >
                          <Link
                            to={`/categories/${kebabCase(
                              category.fieldValue
                            )}/`}
                            className="categories__list-item-link"
                          >
                            {category.fieldValue} <Badge pill>{category.totalCount}</Badge>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                {/* {props.children} */}
              </div>
                )}}
            />
        );
    }
}
   
    // render() {
    //     //console.log(this.props)
    //     const { location } = this.props
    //     // const {
    //     //     author,
    //     //     subtitle,
    //     //     menu,
    //     // } = this.props.data.site.siteMetadata
    //     //const isHomePage = get(location, 'pathname', '/') === '/'

    //     const authorBlock = (
    //     <div>
    //         <div className="sidebar__author-title">
    //             <Link className="sidebar__author-title-link" to="/">
    //             <img
    //       src={profileImg}
    //       alt={`Kyle Mathews`}
    //       style={{
    //         marginRight: rhythm(1 / 2),
    //         marginBottom: 0,
    //         width: rhythm(2),
    //         height: rhythm(2),
    //       }}
    //     />
    //             </Link>
    //         </div>
    //     {/* <p className="sidebar__author-subtitle">{subtitle}</p> */}
    //   </div>
    //     )

    //     return (
    //         <div className="sidebar">
    //         <div className="sidebar__inner">
    //           <div className="sidebar__author">{authorBlock}</div>
    //           <div>
    //             {/* <Menu data={menu} /> */}
    //           </div>
    //         </div>
    //       </div>
    //     );
    // }


export default Sidebar;