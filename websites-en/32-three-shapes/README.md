# 32 - Three Shapes | Bauhaus Layout Workshop

An experimental interactive landing page for a Bauhaus layout workshop, crafted in the spirit of **Constructivist Modernism** and guided by the foundational maxim *"Form follows function"*.

## 1. Bauhaus Design System Tokens

- **Primary Color Blocking**:
  - Bauhaus Red (`--color-red`): `#D02020`
  - Bauhaus Blue (`--color-blue`): `#1040C0`
  - Bauhaus Yellow (`--color-yellow`): `#F0C020`
  - Jet Black (`--color-black` / `--color-fg`): `#121212`
  - Pure White (`--color-white`): `#FFFFFF`
  - Canvas / Ivory (`--color-bg` / `--color-ivory`): `#F0F0F0` / `#F4F1EA`
  - Open Accordion Content Tint (`--color-accordion-exp`): `#FFF9C4`
- **Pure Elementary Geometry**:
  - Strictly limited to circle, square, and triangle.
  - Binary corner rounding: either `0px` (stark rectangular edges) or `50%` (pure circles). No soft rounded pill borders on cards or structural containers.
- **Borders & Hard Offset Shadows**:
  - High-contrast solid black outlines: 4px on desktop, 2px/3px on mobile.
  - Unblurred directional drop shadows: `4px 4px 0 0 #121212`, `6px 6px 0 0 #121212`, `8px 8px 0 0 #121212`.
  - Mechanical depression feedback: Active button presses translate `(2px, 2px)` with shadow collapse.
- **Typography**:
  - Typeface: `Outfit` (Geometric Sans-Serif via Google Fonts).
  - Headings: Weight 900, uppercase, tight leading (0.92–0.95), negative letter-spacing.
  - Body text: 16px–18px, generous line-height (1.6–1.65) for effortless legibility.

## 2. Core Functional Sections

1. **Hero Poster Stage**:
   - Prominent H1: "THREE SHAPES. MANY PERSPECTIVES." with introductory thesis and primary call to action.
   - Right-side constructivist poster composition combining a multiply-blended yellow disc, 45° tilted red diamond, and central black triangle card.
2. **Interactive Layout Presets ("Try 3 Layouts")**:
   - Three distinct spatial compositions: **Balanced**, **Off-center**, and **Rhythmic**.
   - Mechanical 300ms transitions simulating physical shape re-positioning (respects `prefers-reduced-motion`).
   - Interactive reset button and shape rotation control.
   - Dynamic real-time structural analysis readout.
3. **Program Outline ("What You Will Do")**:
   - Asymmetric 2+1 grid layout according to Bauhaus compositional guidelines.
   - Distinct phases: Observe & Analyze, Hands-on Cut & Paste, and Compare & Refine.
   - Emphasizes real physical tools (300gsm art papers, T-squares, cutters) and deliverables (set of 3 finished A3 poster drafts).
4. **Practice Works Showcase**:
   - Four pure CSS/SVG constructivist artworks: Compression, Cutting Edge, Concentric, and Polarity.
   - Interactive detail modal providing spatial and forcefield critiques for each piece.
5. **Sample Session Selection & Registration**:
   - Choice between two equal-duration workshop times (Saturday Morning vs. Sunday Afternoon, 180 mins each).
   - Real-time form synchronization with validation for Name and Email.
   - Informative submission dialog displaying summary data accompanied by honest sample prototype disclaimers.
6. **Bauhaus Accordion (FAQ)**:
   - Closed state: White background, 4px black borders, hard shadow.
   - Open state: Red header with crisp white text, light yellow body panel, and 180° rotating chevron.

## 3. Accessibility & Responsive Engineering

- Contrast ratio exceeds WCAG AA standards (minimum 4.5:1, up to 14:1 on stark black-on-white sections).
- Keyboard operable navigation, focus outlines, and ESC key listener for modal closures.
- Accessible Skip-to-Content link.
- Touch target sizes exceed 44px on mobile viewports.
- Fully fluid layout tested from 320px up to 1440px+ without horizontal overflow.

## 4. File Structure

```
websites-en/32-three-shapes/
├── index.html     # Semantic HTML5 document
├── style.css      # Custom Bauhaus CSS design system
├── script.js      # Vanilla JavaScript for presets, modals, and form interaction
└── README.md      # Documentation and technical specifications
```
