import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Link from '../components/Link';

const PostStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 60% 1fr;

  .postBody {
    grid-column-start: 2;
    max-width: 75ch;
    margin: 0 auto;
    padding-bottom: 3rem;

    p {
      font-size: 1.2em;
      letter-spacing: 0.01rem;
      font-weight: 300;

      .gatsby-resp-image-wrapper {
        margin: 3rem auto;
      }
    }

    h2 {
      font-size: 1.4em;
      margin: 3rem 0 1.5rem 0;
    }
  }

  .postSidebar {
    grid-column-start: 3;
    margin-top: 1rem;
    color: #666;

    .reading-time {
      margin-bottom: 1rem;
    }
  }
`
const HeaderStyle = styled.div`
  width: 100%;
  font-family: Roboto;
  color: white;
  position: relative;


  .meta {
    &:before {
      position: absolute;
      content: "";
      height: 1px;
      width: 100px;
      background: #ffffff;
      top: 0;
      left: 50%;
      margin-left: -50px;
    }

    &:after {
      position: absolute;
      content: "";
      height: 1px;
      width: 100px;
      background: #ffffff;
      bottom: 0;
      left: 50%;
      margin-left: -50px;
    }

    h1 {
     text-transform: uppercase;
     font-weight: 900;
     font-size: 2.5em;
     padding: 0 0 1rem;
     margin: 0;
    }

    time {
      font-size: 0.9em;
    }

    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    padding: 2rem 0;
    margin: 0 auto;
    z-index: 99;
    text-align: center;
  }

  img {
    position: "absolute";
    left: 0;
    top: 0;
    width: "100%";
    height: "100%";
  }

`


const TagStyle = styled.div`
  a {
    display: inline-block;
    padding: 7px;
    margin: 5px 10px 5px 0;
    border: 1px solid #333;
    border-radius: 3px;
    color: white;
    background-color: #333;
  }

  a:hover {
    color: cornflowerblue;
    background-color: white;
  }
`

const TagList = ({ list = [] }) => (
  <TagStyle>
    Topics:
    <br />
    {list.map(tag => (
        <Link to={`/tags/${tag}`}>{tag}</Link>
    ))}
  </TagStyle>
);

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <HeaderStyle>
        <div className="meta">
          <h1>{mdx.frontmatter.title}</h1>
          <time>{mdx.frontmatter.date}</time>
        </div>

        {mdx.frontmatter.banner && (
          <Img
            sizes={mdx.frontmatter.banner.childImageSharp.sizes}
            alt={site.siteMetadata.keywords.join(', ')}
          />
        )}
      </HeaderStyle>

      <PostStyle>
        <div className="postBody">
          <MDXRenderer >{mdx.code.body}</MDXRenderer>
          <hr />

          {prev && (
            <span>
              Previous{' '}
              <Link to={prev.fields.slug}>{prev.fields.title}</Link>
            </span>
          )}
          {next && (
            <span>
              Next{' '}
              <Link to={next.fields.slug}>{next.fields.title}</Link>
            </span>
          )}
        </div>

        <div className="postSidebar">
          <div className="reading-time">
            {mdx.timeToRead} {mdx.timeToRead > 1 ? 'minutes' : 'minute' } to read
          </div>
          <TagList list={mdx.frontmatter.tags} />

        </div>
      </PostStyle>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        slug
        tags
        keywords
      }
      timeToRead
      code {
        body
      }
    }
  }
`;
