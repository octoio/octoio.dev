'use client'

import styled from 'styled-components'
import { Post } from '@/lib/posts'
import Link from 'next/link'
import CopyCodeButton from './CopyCodeButton'

const ArticleContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.7;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #4f46e5;
  }
`

const PostHeader = styled.header`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
`

const PostTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: #64748b;
  font-size: 0.9rem;
`

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`

const PostExcerpt = styled.p`
  font-size: 1.125rem;
  color: #475569;
  font-style: italic;
  margin-bottom: 1rem;
`

const Content = styled.div`
  color: #374151;
  
  h1, h2, h3, h4, h5, h6 {
    color: #1e293b;
    margin: 2rem 0 1rem 0;
    font-weight: 600;
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  blockquote {
    border-left: 4px solid #667eea;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #64748b;
  }
  
  pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 2rem 0;
    overflow-x: auto;
    font-family: var(--font-fira-code), monospace;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  code {
    font-family: var(--font-fira-code), monospace;
    font-size: 0.875rem;
  }
  
  :not(pre) > code {
    background: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    color: #e11d48;
    font-weight: 500;
  }
  
  a {
    color: #667eea;
    text-decoration: underline;
    transition: color 0.2s ease;
    
    &:hover {
      color: #4f46e5;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
  }
  
  th, td {
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
    text-align: left;
  }
  
  th {
    background: #f8fafc;
    font-weight: 600;
  }
  
  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 3rem 0;
  }
`

interface PostContentProps {
  post: Post
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <ArticleContainer>
      <BackLink href="/#posts">← Back to Posts</BackLink>
      
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostExcerpt>{post.excerpt}</PostExcerpt>
        <PostMeta>
          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </PostMeta>
        <PostTags>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </PostTags>
      </PostHeader>
      
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      <CopyCodeButton />
    </ArticleContainer>
  )
}