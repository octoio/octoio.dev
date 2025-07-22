import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import hljs from 'highlight.js/lib/core'

// Import specific languages
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import ocaml from 'highlight.js/lib/languages/ocaml'
import csharp from 'highlight.js/lib/languages/csharp'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'

// Register languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ocaml', ocaml)
hljs.registerLanguage('ml', ocaml) // OCaml alias
hljs.registerLanguage('csharp', csharp)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMetadata {
  title: string
  excerpt: string
  publishedAt: string
  readTime: number
  tags: string[]
}

export interface Post extends PostMetadata {
  slug: string
  content: string
}

export interface PostSummary extends PostMetadata {
  slug: string
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const markdownFiles = fileNames.filter(name => name.endsWith('.md'))

  if (markdownFiles.length === 0) {
    return []
  }

  const posts = markdownFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt,
      readTime: data.readTime,
      tags: data.tags || [],
    }
  })

  // Sort posts by date
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content: markdownContent } = matter(fileContents)

    // Process markdown with syntax highlighting
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeHighlight, { 
        languages: {
          javascript,
          typescript,
          ocaml,
          ml: ocaml,
          csharp,
          json,
          bash
        }
      })
      .use(rehypeStringify)
      .process(markdownContent)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt,
      readTime: data.readTime,
      tags: data.tags || [],
      content: String(processedContent),
    }
  } catch (error) {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''))
}