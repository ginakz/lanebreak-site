# Adding a new blog article (manual workflow)

Use this whenever you want to publish a new article locally and then deploy manually.

## 1) Pick a slug

Use short, lowercase, hyphen-separated slugs.

- ✅ `improve-swim-endurance-for-adults`
- ❌ `Improve Swim Endurance`

Your page URL becomes:

`/blog/<slug>/`

---

## 2) Create the article folder and page

From repo root:

```bash
mkdir -p blog/<slug>
cp blog/article-template.html blog/<slug>/index.html
```

Then open `blog/<slug>/index.html` and replace every placeholder:

- `{{TITLE}}`
- `{{DESCRIPTION}}`
- `{{CANONICAL_URL}}`
- `{{OG_URL}}`
- `{{DATE_PUBLISHED}}`
- `{{DATE_MODIFIED}}`
- `{{READ_TIME}}`
- article body headings/paragraphs

---

## 3) Add it to the blog listing

Edit `blog/index.html`.

Inside `.blog-grid`, add a new `<article class="blog-card">...</article>` matching existing cards.

Minimum fields to fill:

- category + read time
- post title
- short excerpt
- `href="/blog/<slug>/"`

---

## 4) Add it to the sitemap

Edit `sitemap.xml` and add:

```xml
<url>
  <loc>https://www.lanebreak.alpivie.com/blog/<slug>/</loc>
</url>
```

---

## 5) Quick local check before deploy

From repo root:

```bash
python3 -m http.server 4173
```

Open:

- `http://localhost:4173/blog/`
- `http://localhost:4173/blog/<slug>/`

Verify:

- page loads
- nav/footer links work
- metadata changed from placeholders

---

## 6) Deploy

Commit and deploy however you normally publish the static site.

---

## Recommended article checklist (SEO)

Before publishing each post:

- unique title tag and meta description
- canonical URL matches the final live URL
- one clear H1
- helpful intro + scannable H2 sections
- at least one internal link to another blog post
- one CTA link to app download page
- no placeholder text left in the file
