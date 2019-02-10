import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const HeaderStyle = styled.div`
	grid-column-start: span 3;
`

const BlogHeader = () => {
  return (
			<StaticQuery
				query={graphql`
					query {
						header: file(relativePath: {glob: "blog-header.jpg"}) {
							childImageSharp {
								fluid(maxHeight: 350) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
				`}
				render={ data => (
					<HeaderStyle>
						<Img fluid={data.header.childImageSharp.fluid} />
					</HeaderStyle>
				)}
			/>
  )
}

export default BlogHeader;
