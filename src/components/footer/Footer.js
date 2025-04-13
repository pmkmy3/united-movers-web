import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color:rgb(206, 206, 206);
  color: black;
  text-align: center;
  padding: 10px 20px;
  position: sticky;
  bottom: 0;
  width: 100%;
`;

const Footer = () => <FooterContainer>
  &copy; {new Date().getFullYear()} United Movers. All rights reserved.
  
  <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a> | 
  <a href="#" target="_blank" rel="noopener noreferrer">Terms of Service</a>
</FooterContainer>;

export default Footer;