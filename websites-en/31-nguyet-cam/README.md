# 31 - NGUYỆT CẦM (Art Deco Cabaret Music Night)

A classic cabaret and chamber music parlor website designed in the **Art Deco** style (The "Gatsby" Aesthetic), inspired by the Roaring Twenties European and American theaters and jazz parlors.

---

## 1. Design Philosophy & Art Deco Identity

The Art Deco design system embodies **Maximalist Restraint**—crisp geometric lines, bilateral symmetry, theatrical contrast, and warm metallic accents gleaming against obsidian depths.

### Visual Signatures:
- **Bilateral Symmetry & Centered Axis**: Facade, title typography, stage proscenium, and table seating all align strictly along the central vertical axis.
- **Dark Luxury Palette**:
  - Obsidian Black Background: `#111a22`
  - Secondary Rich Charcoal: `#16222d`
  - Cast Metallic Gold: `#c9a227` / `#d4af37`
  - Champagne Cream Typography: `#f2e7d2` (Contrast ratio > 10:1 against obsidian)
  - Muted Pewter Gray: `#94a3b8`
- **Typographic System**:
  - Headings: **Marcellus** (Google Font), a Roman display serif featuring uppercase tracking (`letter-spacing: 0.12em–0.18em`) and strict `line-height: 1.4`.
  - Body Text: **Josefin Sans** (Google Font), a vintage geometric sans-serif with clear readability (minimum 16px).
- **Geometric Motifs & Details**:
  - Subtle 45° diagonal crosshatch background pattern at 3.5% opacity.
  - Sunburst radial gradients highlighting the proscenium and seating sections.
  - Symmetrical fan dividers and 45-degree diamond ornaments.
  - Stepped Ziggurat corners (L-brackets) on content cards and souvenir tickets.
  - Double-frame images with smooth hover transitions from monochrome to rich warm color.
  - Architectural buttons: Strict 0px border radius, minimum 48px height, and gold halo glow (`box-shadow`) on hover.

---

## 2. Content Sections

### I. Theater Facade (Hero)
- Centered display title `NGUYỆT CẦM` with classical sub-headline.
- Twin vertical architectural column dividers.
- Arched proscenium stage photo positioned directly on the central axis.
- Quick navigation CTAs: "View Program" and "Select Seating".

### II. Program I–III
- Three musical acts numbered in classical Roman numerals (I, II, III).
- Stepped ziggurat cards with metallic borders.
- Act details covering musical genre, duration, and clearly designated fictional artists (`Vinh Khang`, `Moc Lan`, `Hoa Nien Ensemble`).

### III. Lounge & Cabaret Space
- Showcase of acoustic craftsmanship, cast bronze hardware, and acoustic velvet drapery.
- Dual framed imagery highlighting instruments and intimate ballroom ambiance.

### IV. Sample Seating Selection
- Symmetrical 3-row layout (Row A Stage-Front VIP, Row B Grand Salon, Row C Mezzanine Balcony).
- **Showtime Switcher**: Allows toggling between Show I (7:30 PM) and Show II (9:15 PM); dynamically updates table availability and notifies users if an incompatible table was selected.
- **Acoustic Perspective View Card**: Displays exact distance, angle toward stage, and tonal properties for the chosen table.
- **Mobile Dropdown Option**: Accessible select menu enabling table choice on smaller screens without awkward pinch/drag gestures.
- **Reset Seating Button**: Reverts the seating plan and perspective card to default state.

### V. Illustrative Souvenir Ticket (Modal)
- Ziggurat stepped border inspired by vintage theatrical ticket stubs.
- Displays selected showtime, table number, seating tier, and perspective angle.
- **Compliance & Safety**: Features a prominent disclaimer: *"⚠️ Not valid for reservation — Art Deco design demonstration only"* and strictly **omits fake QR codes**.
- Fully accessible modal dismissible via `Escape` key, backdrop click, "Close" button, or "Change Selection" to navigate back to the seating layout.

---

## 3. Accessibility & Responsiveness (A11y & Mobile)

- **Contrast Ratios**: Champagne cream text on obsidian achieves > 10:1 (exceeding WCAG AAA). Gold headers achieve > 7:1 (WCAG AA).
- **Keyboard Navigation**: All seating buttons, showtime tabs, and modal triggers feature prominent 2px gold focus-visible rings with offset. Focus is trapped inside the modal when active.
- **Mobile Optimization**: Tested across 320px, 390px, 768px, and desktop viewports. On screens narrower than 640px, the grid collapses into a single column, buttons expand to full touch targets, and typography scales fluidly using `clamp()`.
- **Reduced Motion (`prefers-reduced-motion`)**: Comprehensive media query eliminates high-motion animations while retaining visual borders and structural integrity.
- **Image Fallbacks**: Robust `onerror` fallback handlers render an Art Deco graphic emblem should external images fail to load.

---

## 4. Directory Structure

```
websites-en/31-nguyet-cam/
├── index.html     # Semantic HTML5 markup
├── style.css      # Standalone Art Deco stylesheet
├── script.js      # Interactive showtime switching, seating logic, and modal
└── README.md      # Documentation and technical specification
```

## 5. How to Run

Simply open `index.html` in any modern web browser (Chrome, Safari, Firefox, Edge). No Node.js build process or package installation is required.
