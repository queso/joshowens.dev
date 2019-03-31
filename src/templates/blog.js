import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Link from '../components/Link';
import BlogHeader from '../components/BlogHeader';
import Tag from '../components/Tag';

const BlogStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 60% 1fr;

  @media (max-width: 880px) {
    display: block;
    margin: 0 2.2rem;
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
    font-size: 2.5em;
    margin: 0 0 1rem;

    @media (max-width: 815px) {
      font-size: 1.6em;
    }
  }

  .reading-time {
    color: #777;
  }

  .post {
    margin: 3rem 0;
    border: 1px solid #aaa;
    border-radius: 30px;
    padding: 0;
    box-shadow: 5px 5px 15px 2px #efefef;

    .gatsby-image-wrapper {
      border-top-left-radius: 29px;
      border-top-right-radius: 29px;
    }

    .postInfo {
      padding: 2rem;
    }

    a.more-link {
      color: cornflowerblue;
    }

    a.more-link:hover {
      text-decoration: underline;
    }
  }

  hr {
    color: #777;
    margin 2rem auto;
  }

  .more-posts {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;

    a {
      display:block;
      margin: 7px 0;
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
    {tags.map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </Fragment>
);

const Blog = ({
  data: { site, allMdx, header, logo },
  pageContext: { pagination, tags },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination;

  const posts = page.map(id =>
    allMdx.edges.find(edge => edge.node.id === id),
  );

  return (
    <Layout site={site}>
      <BlogHeader header={header} logo={logo} title={'Josh Owens'} subtitle={'developer, teacher, entrepreneur'} />
      <BlogStyle>
        <MainStyle>
          {posts.map(({ node: post }) => (
            <div className="post" key={post.id}>
              { post.frontmatter.banner ?
                <Link to={post.frontmatter.slug}>
                  <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />
                </Link>
                : null
              }
              <div className="postInfo">
                <h2>
                  <Link to={post.frontmatter.slug}>
                    {post.frontmatter.title}
                  </Link>
                </h2>

                <div className="reading-time">
                  {post.timeToRead} {post.timeToRead > 1 ? 'minutes' : 'minute' } to read
                </div>

                <p>{post.excerpt}</p>

                <Link className="more-link" to={post.frontmatter.slug}>Continue Reading</Link>
              </div>
            </div>
          ))}

          <hr />

          <div className="more-posts">
            {nextPagePath && (
              <Link className="newer" to={nextPagePath}>&larr; Newer Posts</Link>
            )}

            {previousPagePath && (
              <Link className="older" to={previousPagePath}>Older Posts &rarr;</Link>
            )}
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
    header: file(relativePath: {glob: "blog-header.jpg"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    logo: file(relativePath: {glob: "logo.png"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMdx {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          timeToRead
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
          }
        }
      }
    }
  }
`;
