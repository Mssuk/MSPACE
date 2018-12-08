import React, { Component } from 'react';
import { Link } from 'gatsby'
import { css } from "react-emotion"

import { rhythm } from '../utils/typography'
import { Button } from 'reactstrap';

class Post extends Component {
    render() {
       //console.log(this.props)
    const {
        title,
        date,
        category,
        description,
    } = this.props.data.node.frontmatter
    const { excerpt } = this.props.data.node
    const { slug, categorySlug } = this.props.data.node.fields    
    
    return (
        <div className={css`
        margin-bottom: ${rhythm(1.2)};
    `}>

        <h3
           className={css`
           margin-bottom: ${rhythm(1/4)};
       `}
       >
            {/* <div className="post__meta">
    
            <span className="post__meta-category" key={categorySlug}>
                <Link to={categorySlug} className="post__meta-category-link">
                {category}
                </Link>
            </span>
            </div> */}
        {/* {console.log(categorySlug)} */}
        <Button color="dark" size="sm" key={categorySlug} tag={Link} to={categorySlug}>
            {category}
        </Button>

            <Link 
             to = {slug}
           className={css`
           text-decoration: none;
           color: inherit;
           box-shadow: none;
           padding-left: ${rhythm(1/2)};
           font-size: 1.4rem;
           `
           }
           >
            {title}
            </Link>
        </h3>
        <small 
        className={css`
        color:#bbb;
        `}
        >{date}</small>
        {/* <p className="post__description">{description}</p> */}
        <p className={css`
        font-size:1rem;
        color: #848484;
        `}>{excerpt}</p>
      </div>
        );
    }
}

export default Post;

// {data.allMarkdownRemark.edges.map(({node}) =>{
    
//     return (
//       <div key= {node.fields.slug}>
//       <h3
//           className={css`
//           margin-bottom: ${rhythm(1/4)};
//       `}
//       >
//       <Link 
//           to = {node.fields.slug}
//           className={css`
//           text-decoration: none;
//           color: inherit;
//           box-shadow: none;
//       `
//       }
//       >
//       {node.frontmatter.title}{" "}
//       </Link>
//       </h3>
//       <small 
//        className={css`
//        color:#bbb;
//        `}
//        >
//       {node.frontmatter.date}</small>
//       <p>{node.excerpt}</p>

//       </div>