import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const LogoStyle = styled.div`
	max-width: 448px;
	width: 40%;
	margin: 0 auto;
`
const HeaderStyle = styled.div`
	grid-column-start: span 3;
	position: relative;
  font-family: Roboto;

  .meta {
		color: white;

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
     padding: 1rem 0 0;
     margin: 0;
     @media (max-width: 815px) {
      font-size: 2.0em;
			padding: 0.5rem 0 0;
     }
     @media (max-width: 490px) {
      font-size: 1.4em;
			padding: 0.4rem 0 0;
     }
    }

		h2 {
			padding: 0;
			margin: 0;
			font-weight: 400;
			@media (max-width: 815px) {
				font-size: 1.1em;
			}
			@media (max-width: 490px) {
				font-size: 1.0em;
			}
		}

    position: absolute;
    top: 50%;
    left: 50%;
    width: 75%;
    transform: translate(-50%, -50%);
    padding: 2rem 0;
		@media (max-width: 700px) {
			padding: 1rem 0;
		}
		@media (max-width: 440px) {
			padding: 0.5rem 0;
		}
    margin: 0 auto;
    z-index: 99;
    text-align: center;
	}
`

const BlogHeader = () => {
  return (
			<StaticQuery
				query={graphql`
					query {
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
					}
				`}
				render={ data => (
					<HeaderStyle>
						<Img fluid={data.header.childImageSharp.fluid} />
						<div className="meta">
							<LogoStyle>
								<Img fluid={data.logo.childImageSharp.fluid} />
							</LogoStyle>
							<h1>Josh Owens</h1>
							<h2>developer, teacher, entrepreneur</h2>
						</div>
					</HeaderStyle>
				)}
			/>
  )
}

export default BlogHeader;
