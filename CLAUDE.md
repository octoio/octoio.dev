# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**octoio.dev** is a personal portfolio and blog website built with Next.js 15, featuring game development projects and technical articles. The site uses static site generation with MDX for direct page routing and is optimized for deployment on static hosting platforms like Vercel.

## Key Commands

### Development
```bash
# Start development server with Turbopack
npm run dev

# Production build (static export with search index generation)
npm run build

# Generate search index only
npm run generate-search

# Lint code
npm run lint

# Format code
npm run format

# Check code formatting
npm run format:check
```

## Architecture Overview

### Content Management System
The site uses a hybrid approach for content management:

**Blog Posts (MDX Direct Routing)**
- Location: `/src/app/post/[slug]/page.mdx` - each post is a directory with a single MDX file
- **Critical**: MDX files are direct page components, NOT content wrapped by dynamic routes
- Metadata: Embedded as exports within each MDX file with `generateMetadata()` function
- Features: Interactive React components, syntax highlighting, automatic SEO optimization

**Static Data**
- Projects: Defined in `/src/data/projects.ts`
- Social links: Defined in `/src/data/social.ts`
- YouTube videos: Fetched at build time via API (optional)
- Full TypeScript interfaces in `/src/types/index.ts`

### Post Structure
Posts must include both metadata export and generateMetadata function:
```typescript
// Required metadata export for build-time processing
export const metadata = {
  title: "Post Title",
  excerpt: "Post description", 
  publishedAt: "YYYY-MM-DD",
  readTime: 8,
  tags: ["tag1", "tag2"],
  state: PostState.FEATURED, // or PostState.PUBLISHED, PostState.DRAFT
  thumbnail: "/thumbnails/post-image.png"
};

// Required for Next.js metadata generation
export function generateMetadata() {
  return {
    title: `${metadata.title} | Octoio`,
    description: metadata.excerpt,
    openGraph: {
      title: metadata.title,
      description: metadata.excerpt,
      type: "article",
      publishedTime: metadata.publishedAt,
      tags: metadata.tags,
      url: `/post/post-slug/`,
      siteName: "Octoio",
      ...(metadata.thumbnail && { images: [metadata.thumbnail] }),
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.excerpt,
      ...(metadata.thumbnail && { images: [metadata.thumbnail] }),
    },
  };
}
```

### Static Site Generation
- **Build output**: Configured for static export (`output: "export"`) in next.config.ts
- **Post routing**: MDX files are direct page components using Next.js App Router
- **SEO**: Automatic meta tag generation per post via generateMetadata()
- **Performance**: Pre-rendered pages for optimal loading

### Search Architecture
- **Engine**: Fuse.js for fuzzy search across projects, posts, videos, and social links
- **Interface**: Modal search with keyboard shortcuts (⌘K, /)
- **Build process**: Search index generated at build time via `npm run generate-search`
- **Data**: Unified search across all content types with pre-built index

### Key Components
- **CodeHighlighter.tsx**: Client-side syntax highlighting using highlight.js (handles hydration)
- **Search.tsx**: Modal search with keyboard shortcuts and fuzzy search
- **Hero.tsx**: Landing page with interactive terminal and tech stack rotator
- **Post Layout**: `/src/app/post/layout.tsx` provides consistent styling for all posts
- **PostHeader.tsx**: Reusable header component for post metadata display

## Development Patterns

### Adding New Posts
1. Create directory: `/src/app/post/[slug]/` (slug becomes the URL)
2. Create `page.mdx` file with both metadata export and generateMetadata function
3. **CRITICAL**: Never create `[slug]/page.tsx` - causes routing conflicts with MDX
4. Posts automatically appear in listings and search after build
5. Metadata validation handled by TypeScript interfaces

### MDX Routing Architecture
**IMPORTANT**: This project uses MDX files as direct page components, not content wrapped by dynamic routes.

❌ **Never do this** - causes hydration and routing issues:
```
/src/app/post/[slug]/page.tsx  # Dynamic route wrapper
/src/app/post/[slug]/loading.tsx  # Loading state wrapper
```

✅ **Correct approach**:
```
/src/app/post/specific-post/page.mdx  # Direct MDX page component
/src/app/post/layout.tsx  # Shared layout for all posts
```

### Syntax Highlighting
- **Engine**: highlight.js with client-side highlighting via `CodeHighlighter.tsx`
- **Hydration**: Uses `requestAnimationFrame()` to avoid hydration mismatches
- **Languages**: Supports JavaScript, TypeScript, OCaml, C#, Markdown, and more
- **Implementation**: Automatic highlighting of `<code class="language-*">` blocks

### Content Loading
```typescript
// Posts metadata loaded via dynamic imports during build
const { metadata } = await import(`@/app/post/${postDir}/page.mdx`);

// Static data imported directly
import { projects } from '@/data/projects';
import { socialLinks } from '@/data/social';
```

## Technical Configuration

### Build Configuration
- **Static export**: `output: "export"` in next.config.ts for Vercel static hosting
- **MDX support**: Integrated via `@next/mdx` with direct page routing
- **Image optimization**: Disabled (`unoptimized: true`) for static deployment
- **Page extensions**: Includes `.mdx` files as valid page components
- **Search indexing**: Automated via `scripts/generate-search-index.ts`

### YouTube API Integration (Optional)
Set environment variables to include YouTube videos in search:
```bash
YOUTUBE_API_KEY=your_api_key_here
YOUTUBE_CHANNEL_ID=optional_channel_id  # Auto-detects @octoio if omitted
```
- **Graceful fallback**: Search works without API key (videos simply excluded)
- **Build-time fetching**: Videos fetched during build for optimal performance

### MetadataBase Configuration
Critical for proper OpenGraph images and URLs:
```typescript
// In layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://www.octoio.dev"), // Required for absolute URLs
  // ... other metadata
};
```

## Critical Architecture Notes

### Hydration and Client-Side Code
- **CodeHighlighter**: Uses `requestAnimationFrame()` to avoid hydration mismatches
- **Client components**: Minimize use of `'use client'` directive
- **Search modal**: Only loads client-side for performance

### Common Pitfalls
1. **MDX Routing**: Never mix `[slug]/page.tsx` with `specific-slug/page.mdx` - causes conflicts
2. **Metadata**: Must export both `metadata` object and `generateMetadata()` function
3. **Hydration**: Client-side DOM modifications need `requestAnimationFrame()` wrapper
4. **Search Index**: Remember to run `npm run generate-search` after content changes
5. **Static Assets**: Images and thumbnails must be in `/public` directory

### Deployment
- **Platform**: Optimized for Vercel static deployment
- **Build output**: Static files in `/out` directory
- **Environment variables**: YouTube API key optional, graceful fallback included
- **MetadataBase URL**: Set to production domain for proper OpenGraph images