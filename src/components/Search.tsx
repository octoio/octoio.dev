'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Fuse from 'fuse.js'

interface SearchItem {
  type: 'project' | 'post' | 'social' | 'page' | 'video'
  title: string
  description: string
  url: string
  tags: string[]
  featured: boolean
  data: unknown
}

interface SearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [searchData, setSearchData] = useState<SearchItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load search index on component mount
  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        const response = await fetch('/search-index.json')
        if (response.ok) {
          const data = await response.json()
          setSearchData(data)
        } else {
          console.error('Failed to load search index')
        }
      } catch (error) {
        console.error('Error loading search index:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSearchIndex()
  }, [])

  const fuse = useMemo(() => new Fuse(searchData, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.3,
  }), [searchData])

  const results = useMemo(() => {
    if (!query.trim()) {
      // Show all items by default when no query
      return searchData.slice(0, 8).map((item, index) => ({ item, refIndex: index }))
    }
    return fuse.search(query).slice(0, 8)
  }, [query, fuse, searchData])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [results])

  const handleResultClick = useCallback((url: string) => {
    // Open internal links in same tab, external links in new tab
    if (url.startsWith('/') || url.startsWith('#')) {
      window.location.href = url
    } else {
      window.open(url, '_blank')
    }
    onClose()
  }, [onClose])

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
  }, [isOpen, onClose, results, selectedIndex, handleResultClick])

  if (!isOpen) return null

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
          placeholder="Search or browse all content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-6 text-lg bg-transparent border-none outline-none border-b border-slate-200 placeholder:text-slate-400"
          autoFocus
          disabled={isLoading}
        />
        
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <div className="p-6 text-center text-slate-500">
              Loading search index...
            </div>
          )}
          
          {!isLoading && results.length === 0 && query.trim() && (
            <div className="p-6 text-center text-slate-500">
              No results found for &quot;{query}&quot;
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
                  result.item.type === 'video' ? 'bg-red-100 text-red-800' :
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
        
        {!isLoading && results.length > 0 && (
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
            Use ↑↓ to navigate, ↵ to select, ESC to close
          </div>
        )}
      </div>
    </div>
  )
}