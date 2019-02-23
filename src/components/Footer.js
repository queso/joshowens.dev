import React from 'react';
import styled from 'styled-components';
import {SocialTwitterCircular} from 'styled-icons/typicons/SocialTwitterCircular';
import {SocialGithubCircular} from 'styled-icons/typicons/SocialGithubCircular';
import {SocialYoutubeCircular} from 'styled-icons/typicons/SocialYoutubeCircular';
import {SocialLinkedinCircular} from 'styled-icons/typicons/SocialLinkedinCircular';
import {SocialInstagramCircular} from 'styled-icons/typicons/SocialInstagramCircular';

import Link from './Link';

const FooterStyle = styled.div`
  background-color: #333;
  color: white;
  width: 100%;
  margin: 0.5rem auto 0;
  text-align: center;
  padding: 1rem 0;

  a, a:visited {
    color: white;
  }

  a:hover {
    color: cornflowerblue;
  }

`

const Copyright = styled.div`
  display: block;
  font-size: 0.9em;
  font-weight: 400;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
`

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <FooterStyle>
      <Link to="https://twitter.com/joshowens">
        <SocialTwitterCircular size={64} />
      </Link>
      <Link to="https://github.com/queso">
        <SocialGithubCircular size={64} />
      </Link>
      <Link to="https://youtube.com/queso98">
        <SocialYoutubeCircular size={64} />
      </Link>
      <Link to="https://www.linkedin.com/in/joshuaowens">
        <SocialLinkedinCircular size={64} />
      </Link>
      <Link to="https://www.instagram.com/joshjowens/">
        <SocialInstagramCircular size={64} />
      </Link>
      <Copyright>All content copyright Josh Owens © {year} • All rights reserved.</Copyright>
    </FooterStyle>
  )
}
export default Footer;
