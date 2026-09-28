# MAKER'S POST

A landing page design project following the **Newsprint** aesthetic, inspired by classic print newspapers.

## Key Features (Newsprint Style)
- **Newspaper Grid Layout**: Strict column-based grid with a 6/3/3 ratio on desktop.
- **Zero Border Radius**: All elements are perfectly square and sharp (0px).
- **Collapsed Borders**: Avoids double borders by sharing 1px or 4px solid lines between blocks.
- **Typographic Hierarchy**: High contrast between `Playfair Display` (massive headlines) and `Lora` (legible body text).
- **Minimalist Palette**: Ivory paper background (`#F9F9F7`), ink black (`#111111`), and an editorial red accent (`#CC0000`).

## Implemented Functionality
1. **Front Page & Categories**: Displays a lead feature story and secondary articles grouped by category (Design / Makers / Tools).
2. **Reading View**: Detailed article view with a journalistic layout (drop cap, pull quote). Preserves scroll position when returning to the front page.
3. **Edition Switching**: Toggle between different editions (Vol. 1 and Vol. 2) to instantly update the dataset.
4. **Subscription Form**: Styled like a physical newspaper subscription slip. Handles UI state without connecting to a real backend (demo data privacy).
5. **Responsive Design**: Gracefully collapses from a 12-column grid (desktop) to a single column (mobile) while respecting reading order.

## How to Run
Simply open `index.html` in any modern web browser. The project uses Tailwind CSS via CDN and Vanilla JavaScript, requiring no Node.js installation or build step.

## Additional Notes
- The source code only implements the UI/UX and mock data flow.
- For production use, the static data in `script.js` should be replaced with actual API calls.
