import os
import re
from bs4 import BeautifulSoup

designs = {
    42: ("design-42.html", "42-modern-retro-editorial", "Modern-Retro Editorial (Deep Mocha, vintage typography)"),
    43: ("design-43.html", "43-modern-minimalist", "Modern Minimalist (Product Launch) (Deep Olive Green, bento grid)"),
    44: ("design-44.html", "44-trustworthy-dark-fintech", "Trustworthy Dark Fintech (Deep slate, electric lime accents)"),
    45: ("design-45.html", "45-minimalist-document", "Minimalist Document (Read.cv) (Utility-first, stark contrast)"),
    46: ("design-46.html", "46-minimalist-portfolio", "Minimalist Portfolio (Light gray canvas, white surfaces)"),
    47: ("design-47.html", "47-personality-driven-editorial", "Personality-Driven Editorial (Raw expressionism, massive typography)"),
    48: ("design-48.html", "48-minimalist-gallery", "Minimalist Gallery (Curated exhibition feel, pure white/charcoal)"),
    49: ("design-49.html", "49-premium-dark-corporate", "Premium Dark Corporate (High-fidelity trust, crisp white text)"),
    50: ("design-50.html", "50-straightforward-minimalist", "Straightforward Minimalist (Deep slate teal, strict structural lines)")
}

for num, (filename, dirname, title) in designs.items():
    if not os.path.exists(filename):
        print(f"File {filename} not found.")
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract CSS
    styles = soup.find_all('style')
    css_content = ""
    for style in styles:
        css_content += style.get_text() + "\n"
        style.extract()

    # Extract JS (ignore external scripts like tailwind cdn)
    scripts = soup.find_all('script')
    js_content = ""
    for script in scripts:
        if not script.has_attr('src'):
            js_content += script.get_text() + "\n"
            script.extract()

    # Link CSS and JS back
    head = soup.find('head')
    if head:
        if css_content.strip():
            link_tag = soup.new_tag('link', rel="stylesheet", href="style.css")
            head.append(link_tag)
    
    body = soup.find('body')
    if body:
        if js_content.strip():
            script_tag = soup.new_tag('script', src="script.js")
            body.append(script_tag)

    # Reconstruct HTML
    new_html = str(soup)

    # Ensure tailwind script is still there
    # Wait, if tailwind config was in a <script> block, it might have been extracted to JS!
    # Tailwind config MUST remain in the HTML or we need to ensure the `<script>` isn't broken.
    # Actually, tailwind config is just `tailwind.config = {...}` inside a script block. 
    # Let's check if it's there and leave it.
