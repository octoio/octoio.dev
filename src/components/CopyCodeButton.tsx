'use client'

import { useEffect } from 'react'

export default function CopyCodeButton() {
  useEffect(() => {
    // Add copy buttons to all pre elements
    const preElements = document.querySelectorAll('pre')
    
    preElements.forEach((pre) => {
      // Skip if already has a copy button
      if (pre.querySelector('.copy-button')) return
      
      // Make pre element relative positioned
      pre.style.position = 'relative'
      
      const button = document.createElement('button')
      button.className = 'copy-button'
      button.textContent = 'Copy'
      
      // Apply styles
      Object.assign(button.style, {
        position: 'absolute',
        top: '0.75rem',
        right: '0.75rem',
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        padding: '0.5rem 0.75rem',
        fontSize: '0.75rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(4px)',
        fontFamily: 'var(--font-fira-code), monospace',
        zIndex: '10'
      })
      
      let copyTimeout: NodeJS.Timeout
      
      button.addEventListener('click', async () => {
        const codeElement = pre.querySelector('code')
        if (!codeElement) return
        
        const textContent = codeElement.textContent || ''
        
        try {
          await navigator.clipboard.writeText(textContent)
        } catch {
          // Fallback
          const textArea = document.createElement('textarea')
          textArea.value = textContent
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
        }
        
        // Update button state
        button.textContent = '✓ Copied!'
        button.style.background = '#10b981'
        button.style.borderColor = '#10b981'
        
        clearTimeout(copyTimeout)
        copyTimeout = setTimeout(() => {
          button.textContent = 'Copy'
          button.style.background = 'rgba(255, 255, 255, 0.1)'
          button.style.borderColor = 'rgba(255, 255, 255, 0.2)'
        }, 2000)
      })
      
      // Hover effects
      button.addEventListener('mouseenter', () => {
        if (button.textContent === 'Copy') {
          button.style.background = 'rgba(255, 255, 255, 0.2)'
          button.style.borderColor = 'rgba(255, 255, 255, 0.4)'
        }
      })
      
      button.addEventListener('mouseleave', () => {
        if (button.textContent === 'Copy') {
          button.style.background = 'rgba(255, 255, 255, 0.1)'
          button.style.borderColor = 'rgba(255, 255, 255, 0.2)'
        }
      })
      
      pre.appendChild(button)
    })
  }, [])

  return null
}