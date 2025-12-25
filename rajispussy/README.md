# Script Market React Library

A lightweight React front-end experience for showcasing movie scripts with account creation and social sign-in call-to-actions. Everything runs directly in the browser via CDN React builds—no package install required.

## Features
- **User authentication UI** with account creation, password criteria checks (length, uppercase, number, special character), and confirmation matching.
- **Social sign-on triggers** for Google, Twitter/X, and Facebook.
- **Script catalog** with search, genre filter, pricing, and optional logos.
- **Featured area** pinned to the top of the page for promoted scripts.
- **Publishing form** to add new scripts with genre, price, and logo URL selection.

## Getting started
1. Open `index.html` in a modern browser. The page loads React from a CDN and runs without a build step.
2. Create an account or click a social provider to see status messages.
3. Browse, search, and add scripts. Use the "Feature this script" checkbox to surface items in the featured strip and attach a custom logo URL if you have one.

## Development notes
- The experience is framework-only and does not persist data. All state is in-memory for quick demos.
- If you prefer to host locally, serve the folder with any static server (for example, `python -m http.server 8000`) and open `http://localhost:8000` in your browser.
