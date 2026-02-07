# Sarah Van Wart - Personal Website

This is a Next.js version of the personal website, migrated from Jekyll.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app directory with pages and layouts
- `components/` - React components (Navigation, Header, News, Publications, Courses)
- `public/data/` - JSON data files (courses.json, news.json, pubs.json)
- `public/images/` - Image assets
- `app/globals.css` - Global styles (converted from SCSS)

## Migration Notes

This site was migrated from Jekyll to Next.js. Key changes:

- Jekyll layouts → Next.js layouts and components
- Jekyll includes → React components
- SCSS → CSS with CSS variables
- Client-side JavaScript → React hooks and components
- Static data files remain in `public/data/`

## Build

To build for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```
