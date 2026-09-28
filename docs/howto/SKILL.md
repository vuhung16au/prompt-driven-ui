# Beginner's Guide: How to Use the Website Designer Skill

Welcome! This step-by-step tutorial is designed for beginners who want to use AI coding tools (such as Antigravity, Cursor, OpenAI Codex, and others) to generate beautiful, modern websites from text prompts.

By following this guide, you will set up the **Website Designer Skill** and learn how to write effective prompts to create complete website layouts in minutes.

---

## Step 1: Get the Repository

To begin, you need access to the files in the `prompt-driven-ui` project. You can either clone it to your local machine or query/browse it directly online on GitHub.

### Option A: Clone Locally (Recommended)
Open your terminal and run:

```bash
git clone https://github.com/vuhung16au/prompt-driven-ui
cd prompt-driven-ui
```

*Don't have Git installed?* You can also visit [https://github.com/vuhung16au/prompt-driven-ui](https://github.com/vuhung16au/prompt-driven-ui), click the green **Code** button, and select **Download ZIP**. Unzip the folder onto your computer and open it in your code editor.

### Option B: Query Online from GitHub
If you are using a cloud-based AI assistant or an online workspace, you can directly reference or query the repository URL:
`https://github.com/vuhung16au/prompt-driven-ui`

### What is in this repository?
* `docs/agents/SKILL.md`: The skill definition file that instructs your AI assistant how to act as a website designer.
* `websites/` and `websites-en/`: Over 100+ ready-to-use website templates generated from prompts.
* `prompts/` and `prompts-en/`: Sample prompts used to generate the designs.

---

## Step 2: Create a New Skill in Your Tools

A **Skill** is a set of guidelines and instructions that tells your AI assistant how to perform a specialized task—in this case, acting as an expert website designer.

You can configure this skill in your favorite AI tool:

### 1. Antigravity
* Copy the skill file [`docs/agents/SKILL.md`](../agents/SKILL.md) into your agent's skills directory (e.g. `.gemini/skills/website-designer/SKILL.md` or your workspace skills configuration).
* Alternatively, if your Antigravity agent has workspace access to `prompt-driven-ui`, it can automatically read [`docs/agents/SKILL.md`](../agents/SKILL.md) when requested.

### 2. Cursor
* Open Cursor Settings > **Rules for AI** (or create a `.cursorrules` / `.cursor/rules` file in the root of your project).
* Paste the contents of [`docs/agents/SKILL.md`](../agents/SKILL.md) or tag the file in the chat using `@docs/agents/SKILL.md`.

### 3. OpenAI / Codex / ChatGPT
* If using custom instructions or a custom GPT/assistant, copy and paste the instructions from [`docs/agents/SKILL.md`](../agents/SKILL.md) into the **System Prompt** or **Instructions** box.
* When working with the API or a local Codex agent, include `docs/agents/SKILL.md` as part of your system context or workspace instructions.

---

## Step 3: Try a Prompt

Once your skill is loaded, you can ask your AI assistant to generate a website.

### Basic Prompts to Get Started
* **From scratch:**
  > *"Create a clean, responsive landing page for an artisan coffee roaster."*
* **Remixing an existing design:**
  > *"Based on existing website designs in this repository, create a new ticket booking website."*

The AI assistant will read the reference designs in your workspace and produce complete HTML and CSS (or component code) tailored to your topic.

---

## Step 4: Pro-Tips & Prompt Crafting Hints

> [!TIP]
> **Describe what you need in detail!**
> The biggest secret to getting great website designs from AI is to clearly describe what you want the page to contain, how it should look, and who will be using it.

When writing your prompt, try to include the following details:

1. **Website Purpose & Target Audience:**
   * *Example:* "A booking site for independent indie movie theaters targeting young film enthusiasts."
2. **Required Sections & Components:**
   * **Header / Navigation:** Logo, menu items, search bar, sign-in button.
   * **Hero Section:** Engaging headline, subtitle, high-impact background, and a prominent Call-to-Action (CTA) button (e.g., *"Book Now"* or *"Explore Events"*).
   * **Core Feature / Content:** Ticket tiers, movie schedule grid, product cards, or service highlights.
   * **Social Proof:** Testimonials, customer ratings, or partner logos.
   * **Footer:** Quick links, newsletter signup, contact info, and copyright.
3. **Visual Style & Aesthetic:**
   * **Color Scheme:** Dark mode with neon purple accents, warm earthy tones, clean minimalist white with pastel accents, etc.
   * **Mood:** Playful, corporate, elegant, cyberpunk, modern retro.
4. **Reference Existing Templates:**
   * Point the AI to existing templates in the `websites/` or `websites-en/` folder:
     > *"Take the card grid layout from `websites/event-listing.html` and the hero section style from `websites/travel-agency.html`, then combine them for my new hiking tour website."*

### Example of a Detailed Beginner Prompt:
```text
Based on the existing website designs in this repository, create a modern ticket booking website for an indie cinema festival.

Please include:
- A dark-themed layout with warm amber/gold accents.
- A sticky navigation bar with links: "Now Showing", "Schedule", "Tickets", and "About".
- A hero banner featuring a bold title, date range, and a "Buy Passes" button.
- A grid showing 3 featured film cards with poster placeholders, showtimes, and genre tags.
- A 3-step ticket checkout section (Select Date -> Choose Seats -> Payment).
- A footer with social links and an email newsletter form.

Ensure the code is a self-contained, responsive HTML file with modern CSS.
```

---

## Step 5: View and Iterate on Your Website

1. **Save the Code:** Save the generated code into an `index.html` file (or preview it inside your editor).
2. **Open in Browser:** Double-click `index.html` or open it with a local server extension (e.g., Live Server in VS Code).
3. **Iterate:** Don't hesitate to ask follow-up questions to refine the design:
   * *"Make the hero banner taller and add a subtle hover animation to the cards."*
   * *"Change the color theme to deep forest green with cream accents."*
