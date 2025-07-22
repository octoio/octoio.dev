'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { socialLinks } from '@/data/social'
import { SocialLink } from '@/types'

const SocialSection = styled.section`
  padding: 5rem 2rem;
  background: #1e293b;
  color: white;
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.8;
  margin-bottom: 3rem;
  line-height: 1.6;
`

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`

const SocialCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`

const SocialIcon = styled.div<{ platform: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${props => {
    switch (props.platform) {
      case 'email': return '#ea4335'
      case 'discord': return '#5865f2'
      case 'youtube': return '#ff0000'
      case 'reddit': return '#ff4500'
      case 'instagram': return 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
      case 'tiktok': return '#000000'
      default: return '#667eea'
    }
  }};

  img {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
`

const SocialInfo = styled.div`
  flex: 1;
  text-align: left;
`

const SocialPlatform = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
  text-transform: capitalize;
`

const SocialUsername = styled.div`
  opacity: 0.7;
  font-size: 0.875rem;
`

const ContactNote = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ContactText = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1rem;
  opacity: 0.9;
`

const ContactSubtext = styled.p`
  font-size: 0.875rem;
  opacity: 0.7;
`

function getPlatformIconUrl(platform: string): string {
  switch (platform) {
    case 'email': return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gmail.svg'
    case 'discord': return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg'
    case 'youtube': return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg'
    case 'reddit': return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/reddit.svg'
    case 'instagram': return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg'
    case 'tiktok': return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg'
    default: return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/link.svg'
  }
}

function getPlatformName(platform: string): string {
  switch (platform) {
    case 'email': return 'Email'
    case 'discord': return 'Discord'
    case 'youtube': return 'YouTube'
    case 'reddit': return 'Reddit'
    case 'instagram': return 'Instagram'
    case 'tiktok': return 'TikTok'
    default: return platform
  }
}

interface SocialCardComponentProps {
  socialLink: SocialLink
}

function SocialCardComponent({ socialLink }: SocialCardComponentProps) {
  return (
    <SocialCard 
      href={socialLink.url} 
      target={socialLink.platform !== 'email' ? '_blank' : undefined}
      rel={socialLink.platform !== 'email' ? 'noopener noreferrer' : undefined}
    >
      <SocialIcon platform={socialLink.platform}>
        <Image 
          src={getPlatformIconUrl(socialLink.platform)} 
          alt={`${socialLink.platform} logo`}
          width={24}
          height={24}
        />
      </SocialIcon>
      <SocialInfo>
        <SocialPlatform>{getPlatformName(socialLink.platform)}</SocialPlatform>
        {socialLink.username && (
          <SocialUsername>{socialLink.username}</SocialUsername>
        )}
      </SocialInfo>
    </SocialCard>
  )
}

export default function SocialLinks() {
  return (
    <SocialSection id="connect">
      <Container>
        <SectionTitle>Let&apos;s Connect</SectionTitle>
        <SectionSubtitle>
          Follow my journey, join the community, or reach out directly. 
          I love connecting with fellow developers and creators!
        </SectionSubtitle>
        
        <SocialGrid>
          {socialLinks.map((socialLink) => (
            <SocialCardComponent key={socialLink.platform} socialLink={socialLink} />
          ))}
        </SocialGrid>
        
        <ContactNote>
          <ContactText>
            Have a project idea or want to collaborate?
          </ContactText>
          <ContactSubtext>
            Feel free to reach out via email or any of the platforms above. 
            I&apos;m always excited to discuss new opportunities and creative projects!
          </ContactSubtext>
        </ContactNote>
      </Container>
    </SocialSection>
  )
}