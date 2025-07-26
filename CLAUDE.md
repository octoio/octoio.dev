# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**octoio.dev** is a personal portfolio and blog website built with Next.js 15, featuring game development projects and technical articles. The site uses static site generation with MDX for content management and is optimized for deployment on static hosting platforms.

## Key Commands

### Development
```bash
# Start development server with Turbopack
npm run dev

# Production build (static export)
npm run build

# Production server (after build)
npm run start

# Lint code
npm run lint
```

## Architecture Overview

### Content Management System
The site uses a hybrid approach for content management:

**Blog Posts (MDX)**
- Location: `/src/app/post/[slug]/page.mdx`
- Structure: Each post is a directory containing a `page.mdx` file
- Metadata: Embedded as exports within each MDX file
- Features: Syntax highlighting, custom components, automatic SEO optimization

**Static Data**
- Projects: Defined in `/src/data/projects.ts`
- Social links: Defined in `/src/data/social.ts`
- Full TypeScript interfaces in `/src/types/index.ts`

### Post Structure
Posts follow a specific pattern:
```typescript
// Required metadata export in each post
export const metadata = {
  title: "Post Title",
  excerpt: "Post description",
  publishedAt: "YYYY-MM-DD",
  readTime: 8,
  tags: ["tag1", "tag2"],
  featured: true // Optional, defaults to false
}
```

### Static Site Generation
- **Build output**: Configured for static export (`output: "export"`)
- **Post loading**: Metadata extracted via dynamic imports during build
- **SEO**: Automatic meta tag generation per post
- **Performance**: Pre-rendered pages for optimal loading

### Search Architecture
- **Engine**: Fuse.js for fuzzy search across projects, posts, and social links
- **Interface**: Modal search with keyboard shortcuts (⌘K, /)
- **Data**: Searches across all content types with unified results

### Component Structure
```
src/components/
├── Hero.tsx              # Landing page hero section
├── Posts.tsx             # Featured posts display (home page)
├── AllPosts.tsx          # All posts listing page
├── Projects.tsx          # Featured projects display (home page)  
├── AllProjects.tsx       # All projects listing page
├── About.tsx             # About me section
├── LatestVideo.tsx       # Video showcase component
├── SocialLinks.tsx       # Contact/social links section
├── Search.tsx            # Search modal and functionality
├── PostContent.tsx       # MDX post rendering wrapper
├── PostHeader.tsx        # Post page header component
└── PageNavigation.tsx    # Global navigation component
```

### Page Structure
The main page follows this exact order:
1. **Hero** - Title, intro, and "About me" button
2. **LatestVideo** - Featured video content
3. **Posts** - Featured blog posts section
4. **About** - About me section with tech stack
5. **Projects** - Featured projects showcase
6. **SocialLinks** - Contact information and social links

### Featured Content System
Both posts and projects support a featured flag:
- **Featured posts**: Display with indigo border, show in "Featured Posts" section
- **Featured projects**: Display with indigo border, prioritized in listings
- **Fallback behavior**: If no featured content exists, shows recent/all content

## Development Patterns

### Adding New Posts
1. Create directory: `/src/app/post/[slug]/`
2. Create file: `page.mdx` with required metadata export
3. Posts automatically appear in listings and search
4. Metadata validation handled by TypeScript interfaces

### Styling Conventions
- **Tailwind CSS 4.1.11** with custom configuration
- **Typography**: `@tailwindcss/typography` for content styling
- **Fonts**: Geist Sans (primary), Geist Mono (code), Fira Code (highlighting)
- **Featured styling**: Indigo border (`border-2 border-indigo-500`) for featured content
- **Consistency**: Posts and projects use identical styling patterns for featured content

### Component Patterns
- **Client components**: Use `'use client'` directive for interactivity
- **Static components**: Default server components for performance
- **TypeScript**: Full type safety with interfaces for all data structures
- **Responsive design**: Mobile-first approach with Tailwind breakpoints

### Content Loading
```typescript
// Posts are loaded via dynamic imports during build
const { metadata } = await import(`@/app/post/${postDir}/page.mdx`);

// Static data is imported directly
import { projects } from '@/data/projects';
import { socialLinks } from '@/data/social';
```

### SEO Configuration
- **Dynamic metadata**: Generated per post from frontmatter
- **Static pages**: Metadata defined in layout.tsx
- **Sitemap**: Auto-generated from posts and static routes
- **Robots.txt**: Configured for search engine optimization

## Technical Configuration

### Build Configuration
- **Static export**: `output: "export"` in next.config.ts
- **MDX support**: Integrated via `@next/mdx` with custom components
- **Image optimization**: Disabled for static deployment (`unoptimized: true`)
- **Trailing slashes**: Enabled for hosting compatibility
- **YouTube Integration**: Optional YouTube Data API v3 integration for video search

### YouTube API Integration
Set environment variables to include YouTube videos in search:
```bash
YOUTUBE_API_KEY=your_api_key_here
YOUTUBE_CHANNEL_ID=optional_channel_id
```
- **API Setup**: Get API key from Google Cloud Console and enable YouTube Data API v3
- **Auto-detection**: Automatically finds @octoio channel if CHANNEL_ID not provided
- **Graceful fallback**: Search works without API key (videos simply excluded)
- **Build-time fetching**: Videos fetched during build for optimal performance

### Syntax Highlighting
- **Engine**: highlight.js with rehype-highlight
- **Theme**: Custom CSS in globals.css
- **Languages**: Supports OCaml, TypeScript, JavaScript, C#, and more
- **Features**: Line numbers, copy-to-clipboard functionality

### Search Implementation
The search system indexes all content types:
```typescript
// Search combines projects, posts, videos, and social links
const searchData = [
  ...projects.map(project => ({ type: 'project', ...project })),
  ...posts.map(post => ({ type: 'post', ...post })),
  ...youtubeVideos.map(video => ({ type: 'video', ...video })),
  ...socialLinks.map(social => ({ type: 'social', ...social }))
];
```

## Important Notes

### Content Management
- **Post slugs**: Derived from directory names in `/src/app/post/`
- **Metadata validation**: TypeScript interfaces ensure consistency
- **Featured content**: Both posts and projects support `featured: boolean`
- **Auto-sorting**: Posts sorted by `publishedAt` date, newest first

### Deployment Considerations
- **Static export**: Site builds to `/out` directory for static hosting
- **Path aliases**: Uses `@/` prefix for clean imports
- **Performance**: Optimized for fast loading with static generation
- **SEO ready**: Meta tags, sitemap, and robots.txt included

### Styling System
- **Featured content styling**: Use `post.featured ? 'border-2 border-indigo-500' : 'border border-slate-200'` pattern
- **Component consistency**: Posts and projects share identical card styling
- **Background colors**: Featured content uses `bg-white`, non-featured uses `bg-slate-50`
- **Hover effects**: `hover:-translate-y-1 hover:shadow-xl` for interactive elements