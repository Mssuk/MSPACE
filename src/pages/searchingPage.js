import React, { Component } from 'react';
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import Helmet from 'react-helmet'
import { rhythm, scale } from '../utils/typography'
import { Container, Row, Col } from 'reactstrap'

const Hit = ({ hit }) => 
  <Row>
    <Col>

   <Row>
     <Col style={{fontSize:rhythm(0.8)}}>

    <Link to={hit.fields.slug} style={{color:`#3FAB1E`}}>
      <Highlight attribute="frontmatter.title" 
       tagName="strong"
      hit={hit}/>
    </Link >
    </Col>
   </Row>

    <Row>
      <Col style={{ maxWidth: `800px`}}>
       <Highlight attribute="excerpt"
        tagName="strong"
       hit={hit}/>
     </Col>
    </Row>

   </Col> 
  </Row>

const searchClient = algoliasearch(
  '8FW8QFPWQ4',
  'cefb20681c67524242483bb6a55cf2fc'
);

class searchingPage extends Component {
    render() {
            const { title } = this.props.data.site.siteMetadata
            return (
              <div>
                <Layout>
                  <Helmet title={`${title} ::search`} />

                <Container>
                  <Row>
                    <Col>
                  <InstantSearch
                    indexName="mspace_index"
                    searchClient={searchClient}
                  >
                    <SearchBox />
                    <div style={{marginLeft:`-1em`,marginTop:`1.5em`}}>
                    <Hits hitComponent={Hit}/>
                    </div>
                 </InstantSearch>
                 </Col>
                 </Row>
                </Container>
              </Layout>
              </div>
            );
   }
}

export default searchingPage;


export const query = graphql`
  query {
    site{
      siteMetadata{
        title
        description
      }
    }
}
`