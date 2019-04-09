import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const NavStyle = styled.div`
  width: 100%;
  background-color: #333;
  color: white;
  padding: 1rem 0;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;
  }

  a,
  a:visited {
    padding: 8px;
    color: white;
    text-decoration: none;
  }

  a:hover {
    color: cornflowerblue;
  }
`;

const NAVIGATION = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: 'https://spacedojo.com', label: 'Courses' },
];

export default () => {
  return (
    <NavStyle>
      <ul>
        {NAVIGATION.map(navigation => (
          <li key={navigation.label}>
            <Link to={navigation.to}>{navigation.label}</Link>
          </li>
        ))}
      </ul>
    </NavStyle>
  );
};
