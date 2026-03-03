# Blog auto-publish plan

This repo now includes a starter `/blog` section. To auto-publish new articles from your Google Sheet, implement this workflow:

1. Use the sheet as a CMS with columns:
   - `status` (`draft`, `ready`, `published`)
   - `title`, `slug`, `meta_description`
   - `excerpt`, `hero_image_url`, `body_markdown`
   - `published_at`, `updated_at`, `author`
2. Add a script that fetches rows from Google Sheets API and converts each `ready/published` row into:
   - `/blog/<slug>/index.html`
   - listing data for `/blog/index.html`
3. Rebuild `sitemap.xml` to include all blog URLs.
4. Run generation in GitHub Actions on schedule (`cron`) + manual dispatch.
5. Keep publishing manual by reviewing generated files and merging/deploying.

## Suggested script layout

- `scripts/fetch-blog-data.js`
- `scripts/render-blog-pages.js`
- `scripts/build-sitemap.js`

## Suggested CI flow

- `npm run blog:build`
- commit generated files
- deploy static site
