import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../App.scss"
import BlogItems from "../components/blogItems/BlogItems"

const Blog = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="App">
        <div className="Sidebar__container">
          <h1>Blog</h1>
          <p>Documenting new skills and findings.</p>
          <input type="text" placeholder="Search" ></input>
          <div className="nav">
            <Link to="/">Home</Link>
          </div>
        </div>
        <div className="RightSection">
          <BlogItems data={data} />
        </div>
      </div>
    </Layout>
  )
}

export default Blog

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
          tags
        }
      }
    }
  }
`
