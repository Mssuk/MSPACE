import React, { Component } from 'react';
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'
import { StaticQuery, Link, graphql } from 'gatsby'
import profileImg from '../assets/image/me.png'
import { Badge } from 'reactstrap';
import { FaGithub } from 'react-icons/fa'
import { css } from "react-emotion"
import { rhythm, scale } from '../utils/typography'
import { Container, Row, Col } from 'reactstrap'

class Sidebar extends Component {
    render(){
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
               const title = data.site.siteMetadata
               const categories = data.allMarkdownRemark.group
            return(
              <Container>
                <Row>
                  <Col style={{textAlign:'center'}}>
                  <Link to="/">
                  <img src={profileImg}
                  width={210}
                  height={240} />
                  </Link>
                  </Col>
                </Row>
                <Row>
                  <Col md={{size:'auto', offset:1}} xs={{size:'auto', offset:2}}>
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
                  </Col>
                  </Row>
                  <Row>
                    <Col xs={{size:1, offset:4}}>
                  <a href="https://github.com/Mssuk" style={{color:"black"}}>
                  <h4>
                  <FaGithub />
                  </h4>
                  </a>
                  </Col>
                    <Col xs={{size:6}} style={{textAlign:'left', fontSize:'0.6rem', marginTop:'1rem'}}>
                    Mssuk
                    </Col>
                  </Row>
                {/* {props.children} */}
              </Container>
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