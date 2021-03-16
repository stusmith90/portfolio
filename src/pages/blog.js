import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../App.scss"
import BlogItems from "../components/blogItems/BlogItems"

const Blog = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const [dataBlog, setDataBlog] = useState(posts);

  const blogChange = e => {
    const targetVal = e.target.value
    const filterPost = posts.filter(post => {
      return post.frontmatter.title
        .toLowerCase()
        .includes(targetVal.toLowerCase())
    })
    setDataBlog(filterPost);
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="App">
        <div className="Sidebar__container">
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          </div>
          <div class="TopContent">
          <h1>Blog</h1>
          <p>Documenting new skills and findings.</p>
          <input type="text" placeholder="Search" onChange={blogChange}></input>
        </div>
        </div>
        <div className="RightSection">
          <BlogItems data={dataBlog} />
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
