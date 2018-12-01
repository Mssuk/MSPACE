import React from 'react'
import { css } from "react-emotion"
import { StaticQuery, Link, graphql } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import Helmet from 'react-helmet'
import favicon from '../../static/favicon.ico'
import Header from './Header'  
import { Container, Row, Col } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa'

export default (props) =>
(
  <StaticQuery
    query={graphql`
        query{
            site{
                siteMetadata{
                    title
                }
            }
        }
    `}
    
    render={data => {
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    // if (props.location && props.location.pathname === rootPath) {
      header = (

        <h1
          style={{
            ...scale(1.2),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'darkseagreen',
            }}
            to={'/'}
          >
            {data.site.siteMetadata.title}
          </Link> 
        <Link to={'/searchingPage/'} style={{color:"black", fontSize:`1rem`, float:`right`}}>
        <FaSearch />
          </Link>
          </h1>

      )
    // } else {
    //   header = (
    //     <h3
    //       style={{
    //         fontFamily: 'Montserrat, sans-serif',
    //           marginBottom: rhythm(1.5),
    //           marginTop: 0,
            
    //       }}
    //     >
    //       <Link
    //         style={{
    //           boxShadow: 'none',
    //           textDecoration: 'none',
    //           color:'darkseagreen',
    //         }}
    //         to={'/'}
    //       >
    //         {data.site.siteMetadata.title}
    //       </Link>
    //     </h3>
    //   )
    //}
    return(
      <Container style={{background:`white`, minHeight:`800px`}}>
        <Row>
          <Col md={{size:3}}>
            <div 
            className={css`

            border-right: dotted gray 1px;
            `}>
             <Header />
            </div>
          </Col>
         <Col md={{size:9}}>
            <div
            className={css`
            margin: 0 auto;
            max-width: 800px;
            padding: ${rhythm(1)};
            padding-top: ${rhythm(1.5)};
          `}
            >
            <Helmet link = {[
          {rel:'shortcut icon', type:'image/x-icon' , href : `${favicon}`}]}
          ></Helmet>
              {header}
              {props.children}
            </div>
        </Col>
       </Row>
      </Container>
        )}}
    />
)
  
// class Layout extends React.Component {
//   render() {
//     const { location, title, children } = this.props
//     const rootPath = `${__PATH_PREFIX__}/`
//     let header

//     if (location.pathname === rootPath) {
//       header = (
//         <h1
//           style={{
//             ...scale(1.5),
//             marginBottom: rhythm(1.5),
//             marginTop: 0,
//           }}
//         >
//           <Link
//             style={{
//               boxShadow: 'none',
//               textDecoration: 'none',
//               color: 'inherit',
//             }}
//             to={'/'}
//           >
//             {title}
//           </Link>
//         </h1>
//       )
//     } else {
//       header = (
//         <h3
//           style={{
//             fontFamily: 'Montserrat, sans-serif',
//             marginTop: 0,
//             marginBottom: rhythm(-1),
//           }}
//         >
//           <Link
//             style={{
//               boxShadow: 'none',
//               textDecoration: 'none',
//               color: 'inherit',
//             }}
//             to={'/'}
//           >
//             {title}
//           </Link>
//         </h3>
//       )
//     }
//     return (
//       <div
//         style={{
//           marginLeft: 'auto',
//           marginRight: 'auto',
//           maxWidth: rhythm(24),
//           padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
//         }}
//       >
//         {header}
//         {children}
//       </div>
//     )
//   }
// }

// export default Layout
