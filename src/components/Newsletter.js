import React from 'react';
import styled from 'styled-components';

const NewsletterStyle = styled.div`
  text-align: center;
  margin: 2rem 0;
  border: 1px solid #dedede;
  border-radius: 1rem;
  padding: 2rem;
  overflow: hidden;
  box-shadow: 3px 3px 10px 1px #efefef;

  input {
    padding: 0.5rem;
    width: 50%;
    border: none;
    font-size: 1.2em;
    border-bottom: 1px solid #aaa;
  }

  button {
    background-color: cornflowerblue;
    color: white;
    padding: 0.5rem;
    border-color: dodgerblue;
    border-style: solid;
    border-width: 1px;
    border-radius: 0.5rem;
    font-size: 1.2em;
    display: block;
    margin: 1.5rem auto 0;
    text-align: center;
  }
`;

const P = styled.p`
  font-size: 1.1em !important;
`;

const Newsletter = () => (
  <NewsletterStyle>
    <h3>Digging this content?</h3>
    <P className="tagline">
      Get more javascript, business, and podcast news delivered right
      to you!
    </P>
    <form
      action="https://www.getdrip.com/forms/3182289/submissions"
      method="post"
      data-drip-embedded-form="3182289"
    >
      <input
        type="text"
        id="drip-full-name"
        aria-label="Your name"
        placeholder="Your name"
        name="fields[full_name]"
      />
      <input
        type="email"
        aria-label="Your email address"
        required="required"
        placeholder="Your email address"
        name="fields[email]"
        id="drip_email"
      />
      <button>Join now</button>
    </form>
  </NewsletterStyle>
);

export default Newsletter;
