# Thảo An — Take a Moment to Soften and Unwind

A responsive, accessible web experience designed in the **Botanical / Organic Serif** design style, capturing an atmosphere of quiet natural serenity, warmth, and grounded presence.

---

## 1. Visual Identity & Botanical Design System Tokens

- **Design Philosophy:** "A digital love letter to nature" — deliberate pacing, soft organic arches, tactile paper textures, and earthy grounding rather than sterile high-tech minimalism.
- **Earthbound Color Palette:**
  - **Primary Background:** `#F9F8F4` (Warm Alabaster / Rice Paper) paired with `#F3F6F0` (Greenish-white Alabaster).
  - **Primary Text:** `#1F2B22` (Deep Forest Green — softer than pure black, contrast > 11:1 on alabaster).
  - **Sage Accent:** `#5F7359` (Subtle herbal sage, calibrated for high-contrast WCAG AA readability).
  - **Moss Accent:** `#273D2C` (Deep moss green for primary buttons and active indicators).
  - **Terracotta Accent:** `#B6573C` (Warm clay-fired terracotta for hover highlights and alerts).
  - **Clay & Stone:** `#D5C7B7` & `#E5E0D6` (Delicate 1px stone borders and soft warm card surfaces).
- **Tactile Paper Grain Texture:** Full-screen SVG fractal noise texture overlay (`opacity: 0.018`, `pointer-events: none`) evoking physical handmade paper.
- **Editorial Typography:**
  - **Headings:** `Playfair Display` (High-contrast transitional serif) with select italicized phrases (*soften and unwind*, *tailored for you*, *grounding every sense*).
  - **Body Copy:** `Source Sans 3` (Warm humanist sans-serif), minimum 16–17px, line height 1.65–1.75, width constrained to 45–70 characters for optimal reading rhythm.
- **Arched Roman Imagery:** Characteristic Roman arch shape (`220px 220px 48px 48px`), housing authentic, generated botanical photography (herbal infusions, warm basalt stones, organic linen waffle towels).

---

## 2. Acceptance Criteria Verification

1. **Changing services with an invalid previous slot prompts re-selection:**
   - When switching from a 30-minute session (e.g. 09:30 slot) to a 90-minute or 120-minute session, the system validates slot feasibility.
   - If the previous slot does not fit or is unavailable in the new duration schedule, the slot selection is cleared, the confirmation button is disabled, and an accessible alert banner (`#slot-reset-alert`) informs the user: *"You switched to [Service Name]. The previous time slot is no longer valid or lacks sufficient duration for this service. Please select an available time slot below."*
2. **Sample schedule label appears prior to confirmation action:**
   - A clear illustrative notice is positioned right above the confirm button: *"Illustrative Schedule: Demonstration only; does not send real data or create live bookings."*
   - The button itself clearly reads: *"Confirm Illustrative Schedule"*.
3. **Buttons and labels maintain high contrast against sage/light backgrounds:**
   - Every interactive element and label has been strictly calibrated to surpass WCAG 2.1 AA/AAA contrast ratios (e.g. White text on `#273D2C` moss buttons = 12:1; Forest Green `#1F2B22` on Alabaster = 11.5:1).
4. **No confirmation allowed without selected time; selections can be modified:**
   - The confirm button is disabled by default (`disabled="true"`) with informative helper text until a service, date, and time slot are all active.
   - Confirming opens an accessible modal dialog summarizing the session, date, and time, featuring buttons to *"Start Over"* or *"Done"*.
5. **Retained selected service summary at the top of the schedule panel:**
   - A dedicated card displays the currently selected service name, duration, and notes, featuring a prominent *"Change Session"* link that returns smoothly to the service selection grid.
6. **"Before You Arrive" section & interactive note form:**
   - 4-item practical preparation checklist with custom checkmark icons.
   - Special request form with an interactive *"View sample request"* toggle and one-click *"Use this template in notes"* button that populates the textarea.

---

## 3. Responsive Design & Accessibility (A11y)

- **Responsive Viewport Support:**
  - `390px` (Mobile): Single-column stacked layout, responsive arch sizing (240px–300px), clean 2-column slot grid, full-screen mobile menu drawer with focus trap and `Escape` key support. Touch targets $\ge 44\text{px}$.
  - `768px` (Tablet): Fluid 2-to-3 column grid with organic vertical staggering (`card-stagger`).
  - `1200px+` (Desktop): Generous whitespace, refined editorial proportions, hover states.
- **Accessibility:**
  - Full keyboard navigability with distinct 2px `focus-visible` rings.
  - Semantic HTML landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>`).
  - Strict support for `prefers-reduced-motion: reduce`, ensuring all transitions and animations are suppressed without obscuring content.

---

## 4. How to Run

This project requires zero build steps, external npm packages, or bundlers.
1. Open `index.html` directly in any modern browser (Chrome, Safari, Firefox, Edge).
2. Or run a lightweight local static server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```
