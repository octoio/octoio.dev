"use client";

import styled from "styled-components";
import { PostSummary } from "@/lib/posts";

const PostsSection = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1e293b;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const PostCard = styled.article`
  background: #f8fafc;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
  line-height: 1.3;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #64748b;
`;

const PostExcerpt = styled.p`
  color: #475569;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ReadMoreLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #4f46e5;
  }
`;

const ComingSoon = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f1f5f9;
  border-radius: 12px;
  margin-top: 2rem;
`;

const ComingSoonText = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const ComingSoonSubtext = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
`;

interface PostsProps {
  posts: PostSummary[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <PostsSection id="posts">
      <Container>
        <SectionTitle>Latest Posts</SectionTitle>
        {posts.length > 0 ? (
          <PostsGrid>
            {posts.map((post) => (
              <PostCard key={post.slug}>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </PostMeta>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                <TagsContainer>
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagsContainer>
                <ReadMoreLink href={`/posts/${post.slug}`}>
                  Read More →
                </ReadMoreLink>
              </PostCard>
            ))}
          </PostsGrid>
        ) : (
          <ComingSoon>
            <ComingSoonText>No posts yet!</ComingSoonText>
            <ComingSoonSubtext>
              Posts will appear here as I add markdown files to the
              content/posts directory.
            </ComingSoonSubtext>
          </ComingSoon>
        )}

        <ComingSoon>
          <ComingSoonText>More posts coming soon!</ComingSoonText>
          <ComingSoonSubtext>
            I'm working on sharing more insights about game development,
            technical challenges, and creative processes.
          </ComingSoonSubtext>
        </ComingSoon>
      </Container>
    </PostsSection>
  );
}
