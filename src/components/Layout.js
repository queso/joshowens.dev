import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/tag';
import { createGlobalStyle } from 'styled-components';

import 'prismjs/themes/prism-okaidia.css';

import mdxComponents from './mdx';
import Nav from './Nav';
import Footer from './Footer';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Roboto Slab, serif;
    color: #333;

    @media (min-width: 2000px) {
      font-size: 1.2em;
    }
  }

  ${() => {
    /* Override PrismJS Defaults */ return null;
  }}

  h1, h2, h3, h4, h5, h6 {
    font-family: Roboto, san-serif;
  }

  pre {
    background-color: #2f1e2e !important;
    border-radius: 4px;
    font-size: 14px;
  }

  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }

  a, a:visited {
    color: #333;
    text-decoration: none;
  }

  a:hover {
    color: cornflowerblue;
  }

  time {
    font-size: 0.9em;
  }
`;


export default ({ site, frontmatter = {}, children }) => {
  const {
    title,
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata;

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter;

  const keywords = (frontmatterKeywords || siteKeywords).join(', ');
  const description = frontmatterDescription || siteDescription;

  return (
    <Fragment>
      <GlobalStyle />
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="en" />
      </Helmet>

      <MDXProvider components={mdxComponents}>
        <Fragment>
          <Nav />
          {children}
        </Fragment>
      </MDXProvider>
      <Footer />
    </Fragment>
  );
};

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
    }
  }
`;
