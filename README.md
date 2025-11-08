# Kubar Labs Website - Next.js

This is the Next.js version of the Kubar Labs website.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `app/components/` - React components
- `app/data/` - JSON data files (team data, etc.)
- `app/globals.css` - Global styles and CSS variables
- `public/` - Static assets (images, favicon, etc.)

## Features

- ✅ All pages built with Next.js App Router
- ✅ Responsive design maintained
- ✅ Client-side interactivity (dropdown menus, mobile navigation)
- ✅ SEO metadata for all pages
- ✅ Static export support (configured in `next.config.mjs`)

## Build for Production

```bash
npm run build
```

This will create an optimized production build in the `out/` directory (static export).

## Pages

- `/` - Home page with Hero and About Us sections
- `/about` - About page
- `/products` - Products page (NavDhan)
- `/team` - Team page
- `/blog` - Blog page with Substack embeds
- `/contact` - Contact form page

