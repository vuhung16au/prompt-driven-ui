# Blockchain - Interactive Simulation

This project is a web page that simulates how a blockchain works through a simple interactive model, designed in the "Bitcoin DeFi" Aesthetic.

## Features
- Visualizes block structures and links using CSS and Web3 UI design.
- Modifying data within a block changes its hash.
- Verification functionality allows users to see broken links when the hash no longer matches the next block's record.
- Easy state reset to start over.
- Explains basic terminology: Block, Link (Reference Hash), and Verify.

## Technologies Used
- Semantic **HTML5**.
- **Tailwind CSS** (via CDN) for rapid layout and styling.
- **Custom CSS** for glowing effects, glass morphism, and network animations.
- **Vanilla JavaScript** to manage interactive states (`original` -> `edited` -> `checked`).

## Design Standards
- Fully responsive on mobile devices (390px, 768px, 1440px breakpoints).
- True Void dark mode interface with Bitcoin Orange accents.
- Accessibility compliant with `focus-visible`, support for `prefers-reduced-motion`, and logical keyboard tab indexing.
- Meets contrast ratio standards.

## How to Run
Simply open the `index.html` file in your web browser. No additional packages or complex server setups are required.
