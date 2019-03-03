import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const NoImageStyle = styled.div`
  height: 10rem;
  background-color: cornflowerblue;

  @media (min-width: 850px) {
    height: 15rem;
  }
`

const LogoStyle = styled.div`
	max-width: 448px;
	width: 40%;
	margin: 0 auto;
  padding-bottom: 1rem;
`

const HeaderStyle = styled.div`
	grid-column-start: span 3;
	position: relative;
  font-family: Roboto;

  :after {
    transition: opacity 2.5s ease;
    transition-delay: .75s;
    -moz-pointer-events: none;
    -webkit-pointer-events: none;
    -ms-pointer-events: none;
    pointer-events: none;
    background-color: #222;
    content: "";
    display: block;
    height: 100%;
    left: 0;
    opacity: .5;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

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
     padding: 0;
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
    .reading-time {
      padding: 0.5rem 0 0;
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

const BlogHeader = ({ header, logo, title, subtitle, time}) => {
  return (
    <HeaderStyle>
      <Image image={header} />
      <div className="meta">
        <Logo logo={logo} />
        <h1>{title}</h1>
        <Subtitle subtitle={subtitle} time={time} />
      </div>
    </HeaderStyle>
  )
}

const Image = ({image}) => {
  if (image) {
    return <Img fluid={ image.childImageSharp.fluid } />
  } else {
    return <NoImageStyle />
  }
}
const Subtitle = ({ subtitle, time }) => {
  if (subtitle) {
    return <h2>{subtitle}</h2>
  } else {
    return (
      <div className="reading-time">
        {time} {time > 1 ? 'minutes' : 'minute' } to read
      </div>
    )
  }
}

const Logo = ({ logo }) => {
  if (logo) {
    return (
      <LogoStyle>
        <Img fluid={ logo.childImageSharp.fluid } />
      </LogoStyle>
     )
   } else {
    return null;
   }

}

export default BlogHeader;
