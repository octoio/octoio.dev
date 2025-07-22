'use client'

import styled from 'styled-components'

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
`

const HeroContent = styled.div`
  max-width: 800px;
`

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const CTAButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`

export default function Hero() {
  return (
    <HeroContainer id="hero">
      <HeroContent>
        <Title>Octoio</Title>
        <Subtitle>Game Development & Creative Projects</Subtitle>
        <Description>
          Welcome to my digital playground where I explore game development, 
          build creative tools, and share my journey through code. 
          From OCaml data pipelines to Unity games, I love crafting systems that bring ideas to life.
        </Description>
        <CTAButton href="#projects">Explore My Work</CTAButton>
      </HeroContent>
    </HeroContainer>
  )
}