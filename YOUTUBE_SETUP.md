# YouTube Integration Setup

## Quick Setup

1. **Copy environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Get YouTube API key:**
   - Go to [Google Cloud Console](https://console.developers.google.com/)
   - Enable "YouTube Data API v3"
   - Create API Key

3. **Add your API key:**
   ```bash
   # Edit .env.local
   YOUTUBE_API_KEY=your_actual_api_key_here
   ```

4. **Test it works:**
   ```bash
   npm run generate-search
   # Should show: "📺 X YouTube videos" instead of "📺 0 YouTube videos"
   ```

## Notes

- Without API key: search works but excludes videos
- With API key: automatically fetches your @octoio YouTube videos
- Videos are fetched at build time for optimal performance