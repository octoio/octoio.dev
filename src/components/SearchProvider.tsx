'use client'

import { useState, useEffect } from 'react'
import Search from './Search'

export default function SearchProvider() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      // Also support / for quick search
      if (e.key === '/' && !isSearchOpen) {
        // Only if not already typing in an input
        const target = e.target as HTMLElement
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          setIsSearchOpen(true)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  return (
    <>
      <Search 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      
      {/* Floating search button */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="fixed bottom-6 left-6 z-40 lg:bottom-8 lg:left-8 bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-indigo-400/20 group"
        title="Search (⌘K)"
        aria-label="Open search"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        
        {/* Keyboard hint */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Press ⌘K
        </div>
      </button>
    </>
  )
}