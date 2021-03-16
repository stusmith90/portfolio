import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogInItems from "../components/blogInItems/BlogInItems";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  console.log(post)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="App">
        <div className="Sidebar__container">
          <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="TopContent">
          <h1>{post.frontmatter.title}</h1>
          <date>Date Posted: {post.frontmatter.date}</date>
          <tags>Tags: {[...post.frontmatter.tags].join(",")}</tags>
          </div>
        </div>
        <BlogInItems post={post} previous={previous} next={next}/>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
