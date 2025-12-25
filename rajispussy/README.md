# Script Market React Project

A React-style front-end experience for showcasing movie scripts with account creation and social sign-in call-to-actions. The project runs entirely offline using a lightweight React-compatible runtime bundled in the repository, so `npm start` works without downloading packages.

## Features
- **User authentication UI** with account creation, password criteria checks (length, uppercase, number, special character), and confirmation matching.
- **Social sign-on triggers** for Google, Twitter/X, and Facebook.
- **Script catalog** with search, genre filter, pricing, and optional logos.
- **Featured area** pinned to the top of the page for promoted scripts.
- **Publishing form** to add new scripts with genre, price, and logo URL selection.

## Getting started
1. Install Node 18+.
2. Install dependencies: `npm install`.
3. Start the static host: `npm start` (auto-fetches `http-server` via `npx` to serve the SPA entry point for all routes). Hash-based routing means it also works when served from any static host; the app normalizes to `#/` on load.
4. Open `http://localhost:3000/#/` (or your configured host) in your browser.

The app ships as native ES modules in `src/`—no bundler required. All React-like behavior is powered by the local runtime in `src/runtime` to avoid external downloads. There is no `public/` directory; everything is served from the repository root using static hosting (`npm start` runs `http-server` for convenience).

## Development notes
- State is in-memory for quick demos; there is no backend or persistence layer.
- The runtime implements a minimal React-compatible API (createElement, useState, useMemo, and createRoot) sufficient for this UI. If you want to swap in the official React packages, you can point imports to real React and ReactDOM and keep the components as-is.
