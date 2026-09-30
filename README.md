# Prompt-Driven UI

Read this in other languages: [English](README.md) | [Tiếng Việt](README.vi.md) | [简体中文](README.zh-CN.md)

A showcase of 100+ website designs (concepts and variations) generated entirely from text prompts. Explore the possibilities of AI-driven UI generation and see how natural language translates into modern web design.

## 🚀 Project Overview

The goal of this project is to demonstrate the capability of Large Language Models (LLMs) and Generative AI in creating structured, aesthetic, and functional web interfaces directly from text instructions. By providing specific prompts, we can rapidly prototype and iterate on various UI layouts, components, and styles.

## 📁 Project Structure

- `index.html`: The main gallery web page to browse and explore all the generated designs.
- `prompts/` & `prompts-en/`: The natural language text prompts used to generate the corresponding web interfaces.
- `websites/` & `websites-en/`: The actual generated UI source code (HTML, CSS, JS) based on the prompts.
- `thumbs/`: Thumbnail images of the generated websites used for the gallery preview.
- `scripts/`: Utility scripts used for building or organizing the repository.

## ✨ Features

- **100+ AI-Generated Designs:** A rich collection of diverse web interface concepts.
- **Prompt-to-Code Mapping:** Easily compare the input natural language prompt with the resulting output code.
- **Multilingual Prompts:** Prompts and generations categorized in English and other locales.
- **Fully Open Source:** Feel free to explore the code, modify the prompts, and experiment with your own generations.

## 🛠️ How to Use

To view the showcase, you don't need any complex setup:

1. Clone the repository to your local machine.
2. Open the `index.html` file directly in your web browser.
3. Alternatively, for the best experience, run a local development server:
   ```bash
   npx http-server
   # or
   python3 -m http.server
   ```

### 🤖 Using as an AI Agent Skill

The easiest way to generate your own designs is to use this repository as a reference "Skill" for your AI coding assistant (like Antigravity, GitHub Copilot, or Cursor).

1. **Checkout the repository:** Clone this repo to your local workspace.
2. **Instruct your AI Agent:** Ask your coding agent to create a new web design by referencing the existing examples. For example:
   > *"Look at the 50x2 samples in the `prompts/` and `websites/` directories. Based on these examples, create a new landing page for a coffee shop."*
3. **Set up a Permanent Skill:** You can formalize this workflow by creating a custom skill file (e.g., `SKILL.md` or `.cursorrules`) in your workspace that instructs your agent:
   - *"Always use the `prompt-driven-ui` repository as your primary reference for UI generation."*
   - *"Analyze the mapping between `prompts/` and `websites/` to understand the preferred HTML/CSS structure before generating new designs."*

## 📄 License

This project is licensed under the terms of the project's [LICENSE](LICENSE) file.
