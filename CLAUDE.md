# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the changelog website for Wholesale Central, a B2B wholesale marketplace. Built with Next.js 15 and MDX.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Architecture

- **Main content**: All changelog entries live in `src/app/page.mdx` - add new entries at the TOP of the file
- **MDX processing**: Custom remark/rehype/recma plugins in `/mdx/` directory configure the MDX pipeline
- **Email subscriptions**: `/api/subscribe` route uses Postmark for email notifications
- **RSS feed**: Auto-generated at `/feed.xml` from page.mdx content using cheerio to parse the HTML

## Adding Changelog Entries

New entries go at the TOP of `src/app/page.mdx`:

```mdx
---

![](@/images/your-image.png)

## Entry Title {{ date: 'YYYY-MM-DDTHH:MM:SSZ' }}

Brief description of changes.

### <SparkleIcon /> Bug Fixes

- Fixed issue description

### <SparkleIcon /> Improvements

- Added feature description
```

**Entry categories**: Bug Fixes, Improvements, New Features, Breaking Changes

**Images**: Place in `src/images/` and reference with `![](@/images/filename.png)`

## Writing Style

- Write from the platform's perspective ("we" or passive voice)
- Focus on user impact, not technical details
- Use present tense for what the change does

## Environment Variables

```env
POSTMARK_SERVER_TOKEN=...
POSTMARK_FROM_EMAIL=changelog@wholesalecentral.com
POSTMARK_NOTIFY_EMAIL=team@wholesalecentral.com  # optional
NEXT_PUBLIC_SITE_URL=https://changelog.wholesalecentral.com
```

## Brand

- Primary color: #EDAB2F (gold)
- Dark text: #050E40
