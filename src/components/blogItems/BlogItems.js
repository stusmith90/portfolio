import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Layout from "../layout"
import SEO from "../seo"

const BlogItems = ({ data }) => {
  const [tagData, setTagData] = useState(null);
  const [showTags, setShowTags] = useState([]);
  const tags = ["All", "JS", "PHP", "REACT"]
  const posts = data.allMarkdownRemark.nodes
  useEffect(() => {
    const postArray = [];
    setShowTags(posts);
    posts.forEach(post => {
      const tagsPosts = post.frontmatter.tags;
      if(tagsPosts.includes(tagData)){
        postArray.push(post);
      }
    });
    if(postArray.length){
    setShowTags(postArray);
    }
  },[tagData]);

  const tagClick = (e) => {
      const val = e.currentTarget.dataset.id;
      setTagData(val);
  }

  if (showTags.length === 0) {
    return (
      <>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </>
    )
  }
  return (
    <div className="RightSection_Container">
      <ol style={{ listStyle: `none` }}>
        <div className="tags">
          {tags.map(tag => (
            <li data-id={tag} onClick={tagClick}>{tag}</li>
          ))}
        </div>
        {showTags.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <>
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
            </>
          )
        })}
      </ol>
    </div>
  )
}

export default BlogItems
