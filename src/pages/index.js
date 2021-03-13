import React, { useState, useEffect } from 'react';
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/Menu/Menu";
import Intro from "../components/Intro/Intro";
import Timeline from "../components/Timeline/Timeline";
import timeLineData from "../TimelineData.json"

import '../App.scss';

const Index = ({ data, location }) => {

  const [timelineDataAtr, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setData(timeLineData);
    };
    fetchData();
  }, []);
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="App">
      <div className="Sidebar__container">
        <Menu />
        <Intro />
        <div className="nav">
        <Link to="/blog">Blog</Link>
        </div>
        </div>
        <Timeline timelineCardData={timelineDataAtr}/>
    </div>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
