import React, { useState, useEffect } from 'react';
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/Menu/Menu";
import Intro from "../components/Intro/Intro";
import Timeline from "../components/Timeline/Timeline";

import '../App.scss';

const timeLineData = {
  "timelineCards": [{
          "startDate": "Sep 2018",
          "endDate": "Present",
          "title": "Full Stack Developer - Cherry Advertising",
          "location": "London",
          "description": "Working as a Full Stack Front-End developer for an agency. I joined an agency because I enjoy building products from scratch and working through the start of a project to the finish.",
          "techlist": ["REACT", "JAVASCRIPT", "HTML", "CSS", "DRUPAL 8"]
      },
      {
          "startDate": "2018",
          "endDate": "2018",
          "title": "Front-End Contractor - Sussex Peasant",
          "location": "London",
          "description": "I wanted to improve my skills further while working for ATD, I worked as a contractor on the evenings. This was a website build for a popup resturant that sells farm produce. ",
          "techlist": ["HTML", "CSS", "JAVASCRIPT", "DRUPAL"]
      },
      {
          "startDate": "Feb 2016",
          "endDate": "Sep 2018",
          "title": "Full Stack Developer - ATD",
          "location": "London",
          "description": "I worked as a Full Stack Developer for an Ecommerce company for nearly 3 years. I joined as a junior developer but quickly after 8 months became a mid-weight developer. I learnt a lot of new skills including Drupal and various dev opps tasks. I was also part of the CRO team, so i was responsible for creating new features and implementing the features that passed the CRO tests onto the website.",
          "techlist": ["HTML", "CSS", "JAVASCRIPT", "PHP", "DRUPAL"]
      },
      {
          "startDate": "2015",
          "endDate": "2015",
          "title": "Front-End Contractor - NPS",
          "location": "Durham",
          "description": "I worked as a front-end deveveloper on a 3 week contract to help a parking company build a new website. This was my first job outside of University. I learnt a lot during the 3 weeks, got experience with a real client and upped my skills in HTML, CSS and Javascript.",
          "techlist": ["HTML", "CSS", "JAVASCRIPT"]
      },
      {
          "startDate": "Sep 2010",
          "endDate": "Sep 2014",
          "title": "Graduated from University",
          "description": "I Graduated from Leeds with a BSc in Computing and a MSc in Software Engineering",
          "location": "Leeds",
          "techlist": ["HTML", "CSS", "JAVA", "JAVASCRIPT", "PHP"]
      }
  ]
}

const Index = ({ data, location }) => {

  const [timelineDataAtr, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      console.log(timeLineData);
      setData(timeLineData.timelineCards);
    };
    fetchData();
  }, []);
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="App">
      <div className="Sidebar__container">
        <Menu />
        <Intro />
        </div>
        <Timeline timelineCardData={timelineDataAtr}/>
    </div>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
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
