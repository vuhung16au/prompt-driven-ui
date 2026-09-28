# 22 — Ngũ (Designing from Actual Conditions)

Architectural portfolio and renovation practice documentation for dense urban narrow houses in Vietnam, conceived and engineered under the strict tenets of the **Swiss Minimalist (International Typographic Style)**.

---

## 1. Project Overview

- **Practice Studio:** Ngũ Architecture Studio.
- **Main Heading (H1):** Ngũ. Designing from actual conditions.
- **Lead Text:** Narrow house renovation portfolio, presented through current status, choices, and final space.
- **Primary CTA:** View project portfolio.
- **Core Mission:** Documenting practical structural interventions for the two classic afflictions of Southeast Asian urban tube houses—pervasive darkness and cramped stair-choked circulation—by deploying climate-driven vertical atriums and perimeter steel stair structures.

---

## 2. Swiss Minimalist Design System (Visual Identity)

1. **Strict Tri-Color Palette:**
   - Ivory gray ground canvas `#f2f2f0`, stark pure white surfaces `#ffffff`, and muted rhythmic slate bars `#e8e8e5`.
   - Pure black typographic ink `#000000`, providing maximum contrast ratio (21:1).
   - Swiss Signal Red `#d5342b`: Applied strictly as a functional identifier for numerical indexing (01, 02...), categorization tags, and interactive indicators. Never used as gratuitous background filler.
2. **Absolute Zero Radius Geometry:**
   - `border-radius: 0px` across all structural containers, buttons, inputs, dialogs, and frames.
   - Solid black architectural gridlines (2px, 4px) delineating every structural zone.
3. **Flat Depth via Procedural CSS Textures (Zero Drop Shadows):**
   - Pure flatness with tactile print quality:
     - 24×24px subtle coordinate grid (`.swiss-grid-pattern`).
     - 16×16px dot matrix (`.swiss-dots`).
     - 45-degree diagonal hatching (`.swiss-diagonal`).
     - Fine paper noise grain texture (`.swiss-noise`).
4. **Grotesque Typography as Interface:**
   - Rendered in `Inter` with maximum weight juxtaposition (Black 900 headings vs 18px Regular 400 prose).
   - Tabular figures (`font-variant-numeric: tabular-nums`) ensuring column alignment.
   - Generous uppercase tracking (`letter-spacing: 0.1em - 0.2em`) and minimum `line-height: 1.4` to prevent any diacritic or glyph truncation.
5. **Mechanical Snappy Transitions:**
   - 120ms – 180ms linear/ease-out transitions, intentionally avoiding bouncy elastic easing.

---

## 3. Structural Sections & Interactive Components

### 01. Thesis (Luận điểm)
- Asymmetrical 12-column grid: 4 columns on the left lay out the fundamental principle ("Narrow houses are not miniaturized villas"), while 8 columns on the right showcase the completed vertical lightwell (`thesis_interior_1790520199249.jpg`) with structural site constraints.

### 02. Works (Danh mục công trình)
- 3 representative case study rows:
  - **Code N-01:** Hang Bong Townhouse (Residential) — Lightwell & southeast daylight renovation.
  - **Code W-01:** Yen Phu Creative Studio (Workspace) — Converting 3-story tube house into open architectural studio.
  - **Code N-02:** Kim Ma Narrow Residence (Residential) — Split-level steel stair restructuring & climate louvers.
- Interactive category filtering: `All (3)` / `Residential (2)` / `Workspace (1)`.
- Semantic `<dialog>` element for detailed architectural dossiers (materials, scope, structural rationale).
- Dedicated Empty State with reset button if filters yield no results.

### 03. Conditions & Decisions (Hiện trạng & Quyết định)
- 4/8 asymmetric split: Left column states the core problem, breaking down 2 physical constraints (lack of light, cramped stairs) and 2 direct architectural decisions.
- Right column presents the intervention plan drawing (`floor_plan_1790520278194.jpg`) with clear A, B, C annotations.

### 04. Before & After (Trước và sau)
- Twin frames of identical aspect ratio (`before_img_1790520294885.jpg` and `after_img_1790520308244.jpg`).
- **External Button Controls Outside Image Frame:**
  - `[ 1. PRE-RENOVATION STATUS ]`
  - `[ 2. COMPLETED SPACE ]`
  - `[ 3. SIDE-BY-SIDE COMPARISON ]`
- Range slider alternative with live percentage indicator and persistent status banner outside the frame.

### 05. Project Inquiry (Trao đổi dự án)
- Clean, unrounded grid-aligned form capturing:
  1. Project Location
  2. Plot Dimensions & Existing Storeys
  3. Core Renovation Intent
  4. Contact Information
- Transparent prototype notification banner (no fake alert dialogs or simulated email transmission).

---

## 4. Technical Acceptance Criteria Verification

| Acceptance Criterion | Result | Technical Proof |
|----------------------|--------|-----------------|
| **1. Index & Heading Baseline Alignment** | PASS | Handled via `display: flex; align-items: baseline;` on `.section-header`. |
| **2. Button Operations for Before/After** | PASS | Dedicated buttons outside the image container, persistent status readout, and side-by-side mode. |
| **3. Grid & Typography Hierarchy** | PASS | Monospaced project code badges `[N-01]`, tabular metadata, and bold grid lines dominate visually before thumbnails. |
| **4. Image Loading Error Fallback** | PASS | Listens to `error` events, hides broken images, and reveals a structured placeholder with code and message "ARCHITECTURAL IMAGE UPDATING". |
| **5. Full Keyboard & Accessibility (A11Y)** | PASS | Contrast ratio >= 4.5:1 (most 21:1), skip link, high-contrast red focus ring (`:focus-visible`), native dialog accessibility. |
| **6. Respects Reduced Motion** | PASS | `@media (prefers-reduced-motion: reduce)` zeroes out transition durations. |
| **7. Multi-device Responsive Design** | PASS | Explicit `grid-template-columns` definitions at 1024px (12 cols), 768px (6 cols), and 390px/320px (2 cols with span 2 content). Zero horizontal overflow. |

---

## 5. Directory Structure

```
websites-en/22-ngu/
├── index.html                     # Semantic HTML5 markup (English)
├── style.css                      # Swiss Minimalist CSS system
├── script.js                      # Interactive filtering, dialog modal, before/after, form logic
├── README.md                      # English documentation & technical verification
├── hero_architecture_1790520186908.jpg
├── thesis_interior_1790520199249.jpg
├── thumb_n01_1790520210407.jpg
├── thumb_w01_1790520224360.jpg
├── thumb_n02_1790520262345.jpg
├── floor_plan_1790520278194.jpg
├── before_img_1790520294885.jpg
└── after_img_1790520308244.jpg
```

---

## 6. How to Run Locally

Open `index.html` in any modern web browser, or launch via Python static server:

```bash
cd websites-en/22-ngu
python3 -m http.server 8080
```
Navigate to `http://localhost:8080`
