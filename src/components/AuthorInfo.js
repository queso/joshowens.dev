import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const AuthorStyle = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 75ch;
  color: #777;
`;

const AuthorInfo = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          avatar: file(
            relativePath: { glob: "joshowens-avatar.jpg" }
          ) {
            childImageSharp {
              fixed(height: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => (
        <AuthorStyle>
          <Img fixed={data.avatar.childImageSharp.fixed} />
          <h3>Josh Owens</h3>
          <p>
            It all started with an Atari 800XL, but now Josh is a ruby
            and javascript developer with 10 years of professional
            experience. His current love is React.js, which he works
            with daily.
          </p>
        </AuthorStyle>
      )}
    />
  );
};

export default AuthorInfo;
