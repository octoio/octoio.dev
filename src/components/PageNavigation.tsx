'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'

const NavigationContainer = styled.nav`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  
  @media (max-width: 1024px) {
    display: none;
  }
`

const NavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const NavigationItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.3s ease;
`

const NavigationDot = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid ${props => props.isActive ? '#667eea' : 'rgba(255, 255, 255, 0.4)'};
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'rgba(255, 255, 255, 0.1)'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(15px);
  box-shadow: ${props => props.isActive 
    ? '0 4px 15px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
    : '0 2px 10px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  };
  
  &:hover {
    border-color: #667eea;
    background: ${props => props.isActive 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'rgba(102, 126, 234, 0.2)'
    };
    transform: scale(1.15);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const NavigationLine = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isLast'].includes(prop),
})<{ isActive: boolean; isLast: boolean }>`
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: ${props => props.isLast ? '0' : '2rem'};
  background: ${props => props.isActive 
    ? 'linear-gradient(180deg, rgba(102, 126, 234, 0.8) 0%, rgba(102, 126, 234, 0.3) 100%)' 
    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)'
  };
  transition: all 0.3s ease;
  border-radius: 1px;
  backdrop-filter: blur(5px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
`

const NavigationLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  position: absolute;
  right: 2rem;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)' 
    : 'rgba(0, 0, 0, 0.75)'
  };
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(15px);
  transition: all 0.3s ease;
  pointer-events: none;
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.isActive 
    ? 'rgba(255, 255, 255, 0.2)' 
    : 'rgba(255, 255, 255, 0.1)'
  };
  box-shadow: ${props => props.isActive
    ? '0 8px 32px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  };
  
  &:before {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid ${props => props.isActive 
      ? 'rgba(102, 126, 234, 0.9)' 
      : 'rgba(0, 0, 0, 0.75)'
    };
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  ${NavigationItem}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`

interface Section {
  id: string
  label: string
  element?: HTMLElement
}

const sections: Section[] = [
  { id: 'hero', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'posts', label: 'Posts' },
  { id: 'connect', label: 'Connect' },
]

export default function PageNavigation() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: [0, 0.1, 0.5, 1],
    }

    let timeoutId: NodeJS.Timeout

    const observer = new IntersectionObserver((entries) => {
      // Clear any pending timeout
      if (timeoutId) clearTimeout(timeoutId)
      
      // Find the most visible section
      const visibleEntries = entries.filter(entry => entry.isIntersecting)
      
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio and pick the most visible one
        const mostVisible = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        
        // Add small delay to prevent rapid switching
        timeoutId = setTimeout(() => {
          setActiveSection(mostVisible.target.id)
        }, 100)
      }
    }, observerOptions)

    // Wait for DOM to be ready
    const setupObserver = () => {
      sections.forEach((section) => {
        let element = document.getElementById(section.id)
        
        // Special handling for hero section
        if (section.id === 'hero' && !element) {
          element = document.querySelector('main > section:first-child') as HTMLElement
          if (element) {
            element.id = 'hero'
          }
        }
        
        if (element) {
          observer.observe(element)
          console.log(`Observing section: ${section.id}`)
        } else {
          console.warn(`Section not found: ${section.id}`)
        }
      })
    }

    // Setup with small delay to ensure DOM is ready
    const setupTimeoutId = setTimeout(setupObserver, 100)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (setupTimeoutId) clearTimeout(setupTimeoutId)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Manually set active section immediately for better UX
      setActiveSection(sectionId)
      
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <NavigationContainer>
      <NavigationList>
        {sections.map((section, index) => (
          <NavigationItem key={section.id} isActive={activeSection === section.id}>
            <NavigationDot
              isActive={activeSection === section.id}
              onClick={() => scrollToSection(section.id)}
              aria-label={`Navigate to ${section.label}`}
            />
            <NavigationLine 
              isActive={activeSection === section.id} 
              isLast={index === sections.length - 1}
            />
            <NavigationLabel isActive={activeSection === section.id}>
              {section.label}
            </NavigationLabel>
          </NavigationItem>
        ))}
      </NavigationList>
    </NavigationContainer>
  )
}