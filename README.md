# Wholesale Central Changelog

The official changelog for [Wholesale Central](https://www.wholesalecentral.com) - America's wholesale hub since 1997, connecting wholesalers with retailers.

Built with [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

First, install dependencies:

```bash
npm install
```

Create a `.env.local` file with the required environment variables:

```env
# Postmark Email Configuration
POSTMARK_SERVER_TOKEN=your-postmark-server-token
POSTMARK_FROM_EMAIL=changelog@wholesalecentral.com
POSTMARK_NOTIFY_EMAIL=team@wholesalecentral.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://changelog.wholesalecentral.com
```

Then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Changelog Entries

All changelog entries are stored in `./src/app/page.mdx`. Add new entries at the TOP of the file:

```md
---

![](@/images/your-screenshot.png)

## Entry Title {{ date: '2024-12-02T00:00Z' }}

Description of changes...

### <SparkleIcon /> Bug Fixes

- Fixed issue description

### <SparkleIcon /> Improvements

- Added feature description
```

### Images

Place changelog images in `./src/images/` and reference them with `![](@/images/filename.png)`.

### Date Format

Use ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`

## Email Subscriptions

The site uses [Postmark](https://postmarkapp.com) for email subscriptions. Configure these environment variables:

- `POSTMARK_SERVER_TOKEN` - Your Postmark server API token
- `POSTMARK_FROM_EMAIL` - Verified sender email address
- `POSTMARK_NOTIFY_EMAIL` - (Optional) Email to notify on new subscriptions

## RSS Feed

An RSS feed is automatically generated at `/feed.xml`. Update the feed metadata in `./src/app/feed.xml/route.ts`.

## Related Links

- [Wholesale Central](https://www.wholesalecentral.com) - Main marketplace
- [Documentation](https://learn.wholesalecentral.com) - Help center & tutorials
- [Blog](https://blog.wholesalecentral.com) - News & updates

## License

This site template is based on [Tailwind Plus](https://tailwindcss.com/plus) and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).
