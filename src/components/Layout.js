import React from 'react'
import { css } from "react-emotion"
import { StaticQuery, Link, graphql } from 'gatsby'
import { rhythm, scale } from '../utils/typography'


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
    if (props.location && props.location.pathname === rootPath) {
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
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color:'darkseagreen',
            }}
            to={'/'}
          >
            {data.site.siteMetadata.title}
          </Link>
        </h3>
      )
    }
    return(
      <div
      className={css`
      margin: 0 auto;
      max-width: 800px;
      padding: ${rhythm(2)};
      padding-top: ${rhythm(1.5)};
    `}
      >
        {header}
        {props.children}
      </div>
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
