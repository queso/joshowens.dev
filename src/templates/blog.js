import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Link from '../components/Link';

const BlogStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 60% 1fr;

  @media (max-width: 880px) {
    display: block;
    margin: 0 10px;
  }
`
const MainStyle = styled.div`
  grid-column-start: 2;
  max-width: 75ch;
  margin: 0 auto;

  p {
    font-size: 1.2em;
    letter-spacing: 0.01rem;
    font-weight: 300;

    @media (max-width: 815px) {
      font-size: 0.9em;
    }
  }

  h2 {
    font-size: 1.4em;
    margin: 0 0 1rem;
  }

  .post {
    margin: 3rem 0;

    a.more-link {
      color: cornflowerblue;
    }

    a.more-link:hover {
      text-decoration: underline;
    }
  }

`

const SidebarStyle = styled.div`
  grid-column-start: 3;
  margin: 3rem auto 1rem;
  max-width: 75ch;
  @media (min-width: 875px) {
    width: 80%;
  }
`

const Tags = ({ tags }) => (
  <Fragment>
    <ul>
      {tags.map(tag => (
        <li key={tag}>
          <Link to={`/tags/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  </Fragment>
);

const Blog = ({
  data: { site, allMdx },
  pageContext: { pagination, tags },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination;

  const posts = page.map(id =>
    allMdx.edges.find(edge => edge.node.id === id),
  );

  return (
    <Layout site={site}>
      <BlogStyle>
        <MainStyle>
          {posts.map(({ node: post }) => (
            <div className="post" key={post.id}>
              <h2>
                <Link to={post.frontmatter.slug}>
                  {post.frontmatter.title}
                </Link>
              </h2>

              <small>{post.frontmatter.date}</small>

              <p>{post.excerpt}</p>

              <Link className="more-link" to={post.frontmatter.slug}>Continue Reading</Link>
            </div>
          ))}

          <hr />

          <div>
            Pagination:
            <ul>
              {nextPagePath && (
                <li>
                  <Link to={nextPagePath}>Next Page</Link>
                </li>
              )}

              {previousPagePath && (
                <li>
                  <Link to={previousPagePath}>Previous Page</Link>
                </li>
              )}
            </ul>
          </div>
        </MainStyle>
        <SidebarStyle>
          All topics on the blog:{' '}
          <Tags tags={tags} />
        </SidebarStyle>
      </BlogStyle>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            tags
            keywords
          }
        }
      }
    }
  }
`;
