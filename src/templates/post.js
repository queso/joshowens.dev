import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import styled from 'styled-components';

import Layout from '../components/Layout';
import BlogHeader from '../components/BlogHeader';
import AuthorInfo from '../components/AuthorInfo';
import Tag from '../components/Tag';
import Newsletter from '../components/Newsletter';

const PostStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 60% 1fr;

  @media (max-width: 1150px) {
    grid-template-columns: 10px 1fr 20%;
  }

  @media (max-width: 880px) {
    display: block;
    margin: 0 2.2rem;
  }

  time {
    font-size: 1em;
    text-align: center;
    display: block;
    color: darkorange;
    padding-top: 2rem;
  }

  .postBody {
    grid-column-start: 2;
    max-width: 75ch;
    margin: 0 auto;
    padding-bottom: 3rem;

    pre {
      overflow-x: auto;
    }

    p {
      font-size: 1em;
      letter-spacing: 0.01rem;
      font-weight: 300;

      @media (min-width: 815px) {
        font-size: 1.2em;
      }

      .gatsby-resp-image-wrapper {
        margin: 3rem auto;
      }
    }

    h2 {
      font-size: 1.6em;
      margin: 3rem 0 1.6rem 0;
      color: #d66a00;
    }
  }

  .postSidebar {
    grid-column-start: 3;
    margin: 1.5rem auto 0;
    justify-self: center;
    color: #666;
    max-width: 75ch;
    @media (min-width: 875px) {
      width: 80%;
    }
  }
`;

const TagList = ({ list = [] }) => (
  <div>
    Topics:
    <br />
    {list.map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </div>
);

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <BlogHeader
        header={mdx.frontmatter.banner}
        title={mdx.frontmatter.title}
        time={mdx.timeToRead}
        hideTitle={mdx.frontmatter.supportPage}
      />

      <PostStyle>
        <div className="postBody">
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
          {mdx.frontmatter.supportPage ? null : (
            <Fragment>
              <time>Written on {mdx.frontmatter.date}</time>
              <Newsletter />
              <AuthorInfo />
            </Fragment>
          )}
        </div>

        <div className="postSidebar">
          {mdx.frontmatter.supportPage ? null : (
            <TagList list={mdx.frontmatter.tags} />
          )}
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
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        slug
        tags
        keywords
        supportPage
      }
      timeToRead
      code {
        body
      }
    }
  }
`;
