"use client";

import styled from "styled-components";

const FooterContainer = styled.footer`
  background: #0f172a;
  color: white;
  padding: 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #e0e7ff;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  opacity: 0.6;
  margin-top: 1rem;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>Built with Next.js</FooterText>
        <FooterLinks>
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#posts">Posts</FooterLink>
          <FooterLink href="#connect">Connect</FooterLink>
          <FooterLink href="mailto:octoiodev@gmail.com">Contact</FooterLink>
        </FooterLinks>
        <Copyright>
          © {new Date().getFullYear()} Octoio. Made with ❤️ for the dev
          community.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}
