import React from 'react';
import styled from 'styled-components';
import Link from '../components/Link';

const TagStyle = styled.span`
  a {
    display: inline-block;
    padding: 7px 10px;
    margin: 5px 10px 5px 0;
    border-radius: 30px;
    color: cornflowerblue;
    background-color: AliceBlue;
  }

  a:hover {
    text-decoration: underline;
  }
`

const Tag = ({tag}) => (
  <TagStyle>
    <Link key={tag} to={`/tags/${tag}`}>{tag}</Link>
  </TagStyle>
)

export default Tag;
