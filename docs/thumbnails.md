# Thumbnail Generation Guide

This document explains how to use the automated thumbnail generation script for the 50 prompt-driven websites in this workspace.

## Prerequisites

The project requires [Node.js](https://nodejs.org/) to be installed. We use [Playwright](https://playwright.dev/) to open local HTML files in a headless browser and capture screenshots.

If this is your first time running the script, make sure you install the necessary dependencies:

```bash
make install
npx playwright install chromium
```

## How to run

We provide a convenient Makefile target to generate all the thumbnails. To run it, simply execute:

```bash
make thumbs
```

## What it does

The `make thumbs` command executes `scripts/create-thumbnails.ts`. This script will:
1. Scan the `websites/` directory (for Vietnamese, `vi`) and `websites-en/` directory (for English, `en`).
2. Find the 50 websites prefixed with a number (e.g., `01-expense-splitter`).
3. Launch a headless Chromium browser using Playwright.
4. Take a screenshot for each website in two modes:
   - **Landscape:** 1920x1080 resolution
   - **Portrait:** 1080x1920 resolution
5. Save the generated images to the `thumbs/` folder.

The resulting files will be structured as follows to keep names clean:
- `thumbs/landscape/xx-website-name-vi.png`
- `thumbs/landscape/xx-website-name-en.png`
- `thumbs/portrait/xx-website-name-vi.png`
- `thumbs/portrait/xx-website-name-en.png`

In total, generating the thumbnails for 50 websites across 2 languages and 2 modes will yield 200 thumbnails.

## Troubleshooting

- **Missing node_modules:** Run `npm install`.
- **Missing Browser Binary:** If Playwright complains about missing browser binaries, run `npx playwright install chromium`.
- **Clean up:** If you want to delete all generated thumbnails and start fresh, run `make clean-thumbs`.
