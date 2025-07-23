'use client'

import { useState } from 'react'

export default function LatestVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  
  // For now, this is a placeholder. In the future, you can fetch from YouTube API
  const latestVideo = {
    id: 'dQw4w9WgXcQ', // Placeholder video ID
    title: 'Building My Game Development Ecosystem',
    description: 'A deep dive into the tools and workflow I use for game development, featuring OCaml data pipelines and Unity integration.',
    thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`
  }

  const handleVideoClick = () => {
    setIsPlaying(true)
  }

  const handleExternalClick = () => {
    window.open(`https://www.youtube.com/watch?v=${latestVideo.id}`, '_blank')
  }

  return (
    <section id="latest-video" className="py-20 px-8 bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Latest Video</h2>
        <p className="text-lg text-white/90 text-center mb-12 max-w-2xl mx-auto">
          Watch my latest insights on game development, programming techniques, and creative processes.
        </p>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div 
              className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-600 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              onClick={isPlaying ? undefined : handleVideoClick}
            >
              {isPlaying ? (
                <iframe
                  className="absolute inset-0 w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${latestVideo.id}?autoplay=1&rel=0`}
                  title={latestVideo.title}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <>
                  <img 
                    src={latestVideo.thumbnail} 
                    alt={latestVideo.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                    onError={(e) => {
                      // Fallback to default thumbnail if maxresdefault fails
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes('maxresdefault')) {
                        target.src = `https://img.youtube.com/vi/${latestVideo.id}/hqdefault.jpg`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-white hover:scale-110">
                      <div className="w-0 h-0 border-l-[16px] border-l-indigo-500 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <h3 className="text-white text-xl font-semibold mb-2">{latestVideo.title}</h3>
              <p className="text-white/80 leading-relaxed mb-4">{latestVideo.description}</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleExternalClick}
              className="text-white font-medium px-6 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5"
            >
              Watch on YouTube →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}