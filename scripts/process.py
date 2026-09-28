import os
import re

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

def extract_content(html):
    css = ""
    js = ""
    
    # Extract styles
    def style_replacer(m):
        nonlocal css
        css += m.group(1).strip() + "\n"
        return '<link rel="stylesheet" href="style.css">'
    
    html = re.sub(r'(?i)<style[^>]*>(.*?)</style>', style_replacer, html, flags=re.DOTALL)
    
    # Extract scripts
    def script_replacer(m):
        nonlocal js
        content = m.group(1).strip()
        # Don't extract tailwind config
        if 'tailwind.config' in content:
            return m.group(0)
        if content:
            js += content + "\n"
            return '<script src="script.js"></script>'
        return m.group(0)
    
    # Only match scripts without src attribute
    html = re.sub(r'(?i)<script(?:(?!\bsrc\b)[^>])*>(.*?)</script>', script_replacer, html, flags=re.DOTALL)
    
    # Deduplicate <link> and <script> tags
    html = re.sub(r'(<link rel="stylesheet" href="style.css">\s*)+', '<link rel="stylesheet" href="style.css">\n', html)
    html = re.sub(r'(<script src="script.js"></script>\s*)+', '<script src="script.js"></script>\n', html)
    
    return html, css, js

for num, (filename, dirname, title) in designs.items():
    if not os.path.exists(filename):
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        html_content = f.read()
        
    new_html, css, js = extract_content(html_content)
    
    for base in ["websites", "websites-en"]:
        folder = os.path.join(base, dirname)
        os.makedirs(folder, exist_ok=True)
        
        with open(os.path.join(folder, "index.html"), 'w', encoding='utf-8') as f:
            f.write(new_html)
            
        if css.strip():
            with open(os.path.join(folder, "style.css"), 'w', encoding='utf-8') as f:
                f.write(css.strip() + "\n")
                
        if js.strip():
            with open(os.path.join(folder, "script.js"), 'w', encoding='utf-8') as f:
                f.write(js.strip() + "\n")
                
        # Write README.md
        readme = f"# {title}\n\nDesign matching the prompt.\n"
        with open(os.path.join(folder, "README.md"), 'w', encoding='utf-8') as f:
            f.write(readme)
            
    print(f"Processed {filename} -> {dirname}")
