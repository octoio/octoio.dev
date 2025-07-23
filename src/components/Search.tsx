'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'
import { projects } from '@/data/projects'
import { socialLinks } from '@/data/social'

interface SearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const searchData = useMemo(() => [
    ...projects.map(project => ({
      type: 'project' as const,
      title: project.title,
      description: project.description,
      url: `/projects#${project.id}`,
      data: project
    })),
    ...socialLinks.map(social => ({
      type: 'social' as const,
      title: social.name,
      description: social.description,
      url: social.url,
      data: social
    })),
    // Add posts to search
    {
      type: 'post' as const,
      title: 'Building a Multi-Language Game Development Ecosystem',
      description: 'How I built a comprehensive system combining OCaml, TypeScript, and Unity for game asset management.',
      url: '/posts/multi-language-game-ecosystem/',
      data: null
    },
    {
      type: 'post' as const,
      title: 'The Power of Type Safety in Game Data Pipelines',
      description: 'Exploring how strong typing across multiple languages prevents bugs and improves developer experience.',
      url: '/posts/type-safety-game-pipelines/',
      data: null
    },
    {
      type: 'page' as const,
      title: 'All Projects',
      description: 'View all my projects',
      url: '/projects',
      data: null
    },
    {
      type: 'page' as const,
      title: 'All Posts',
      description: 'Read all my blog posts',
      url: '/posts',
      data: null
    }
  ], [])

  const fuse = useMemo(() => new Fuse(searchData, {
    keys: ['title', 'description'],
    threshold: 0.3,
  }), [searchData])

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query).slice(0, 8)
  }, [query, fuse])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(i => (i + 1) % results.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(i => (i - 1 + results.length) % results.length)
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex].item.url)
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, results, selectedIndex])

  if (!isOpen) return null

  const handleResultClick = (url: string) => {
    // Open internal links in same tab, external links in new tab
    if (url.startsWith('/') || url.startsWith('#')) {
      window.location.href = url
    } else {
      window.open(url, '_blank')
    }
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 pt-[10vh] px-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Search projects, pages, and social links..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-6 text-lg bg-transparent border-none outline-none border-b border-slate-200 placeholder:text-slate-400"
          autoFocus
        />
        
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length === 0 && query.trim() && (
            <div className="p-6 text-center text-slate-500">
              No results found for &quot;{query}&quot;
            </div>
          )}
          
          {results.length === 0 && !query.trim() && (
            <div className="p-6 text-center text-slate-500">
              Start typing to search projects, pages, and social links...
            </div>
          )}
          
          {results.map((result, index) => (
            <div
              key={`${result.item.type}-${result.item.title}`}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-colors duration-150 ${
                index === selectedIndex ? 'bg-indigo-50' : 'hover:bg-slate-50'
              }`}
              onClick={() => handleResultClick(result.item.url)}
            >
              <div className="flex items-start gap-3">
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  result.item.type === 'project' ? 'bg-blue-100 text-blue-800' :
                  result.item.type === 'social' ? 'bg-green-100 text-green-800' :
                  result.item.type === 'post' ? 'bg-orange-100 text-orange-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {result.item.type}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{result.item.title}</div>
                  <div className="text-sm text-slate-600 mt-1">{result.item.description}</div>
                </div>
                <div className="text-slate-400 text-sm">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {results.length > 0 && (
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
            Use ↑↓ to navigate, ↵ to select, ESC to close
          </div>
        )}
      </div>
    </div>
  )
}