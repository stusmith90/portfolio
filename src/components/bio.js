/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { FaLinkedin, FaTwitterSquare } from "react-icons/fa"
import { GoMarkGithub } from "react-icons/go"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/me.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <>
      <div className="bio">
        {avatar && (
          <Image
            fixed={avatar}
            alt={author?.name || ``}
            className="bio-avatar"
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        )}
        {author?.name && (
          <>
            <p>
              I'm a {author?.summary || null}
              {` `}
            </p>
          </>
        )}
      </div>
      <div class="social-media-icons">
        <span>
          <a
            href="https://www.linkedin.com/in/stuart-smith-b435127b/"
            target="_blank"
          >
            <FaLinkedin size="2em" />
          </a>
        </span>
        <span>
          <a href="https://twitter.com/Stuart90Smith" target="_blank">
            <FaTwitterSquare size="2em" />
          </a>
        </span>
        <span>
          {" "}
          <a href="https://github.com/stusmith90" target="_blank">
            <GoMarkGithub size="2em" />
          </a>
        </span>
      </div>
    </>
  )
}

export default Bio
