const data = {
    1: {
        name: "Vol. 1: Minimal",
        date: "SEP 28, 2026",
        lead: {
            id: "lead-1",
            category: "Feature",
            title: "When an Idea Needs Fewer Things",
            lead: "Sometimes, the best way to grow a project isn't by adding features, but by boldly cutting away the unnecessary.",
            p1: "In the early stages of a project, we are often tempted to build everything. Every new idea seems appealing and necessary. However, taking on too much often leads to a lackluster product, lacking focus and hard to complete.",
            quote: "Cutting away isn't about losing, it's about clarifying what remains.",
            p2: "Reducing scope does not mean lowering standards. On the contrary, it requires more rigor in evaluating what truly brings value. By focusing on a single problem and solving it well, your small project has a chance to survive and thrive.",
            p3: "In the end, a finished product with fewer features is still better than an unfinished draft with dozens of ideas. Start small, do it well, and only expand when absolutely necessary.",
            author: "Tran A (Illustrative)",
            image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop"
        },
        articles: {
            "design": [
                { id: "tk-1-1", title: "Grid is Not Just for Show", desc: "When every line has a function and creates a solid structure." },
                { id: "tk-1-2", title: "Is Drop Shadow Dead?", desc: "The rise of sharp flat design and the disappearance of the drop shadow." }
            ],
            "makers": [
                { id: "nl-1-1", title: "Starting from Zero", desc: "The journey of building a first project from messy lines of code." },
                { id: "nl-1-2", title: "Code is Art", desc: "A programmer's perspective on beauty in data structures." }
            ],
            "tools": [
                { id: "cc-1-1", title: "Pen and Paper", desc: "The most powerful tool for sketching ideas before turning on the computer." },
                { id: "cc-1-2", title: "Mechanical Keyboards", desc: "Typing feel, clacky sounds, and improved workflow speed." }
            ]
        }
    },
    2: {
        name: "Vol. 2: Expand",
        date: "OCT 15, 2026",
        lead: {
            id: "lead-2",
            category: "Feature",
            title: "Ready for the Leap",
            lead: "When a small project starts to gain a steady user base, it's time to think about a larger and more robust system.",
            p1: "Starting small helps us move fast, but to go far, a project needs a solid foundation. Scaling is not just about buying more servers or writing new features. It's the process of restructuring our entire way of thinking and working.",
            quote: "Scaling is not just adding people, it is adding room for creativity.",
            p2: "The difficulties in scaling often come from technical debt accumulated from the early days. We must learn to pay off these debts before they collapse the entire running system.",
            p3: "No matter how large the scale is, the most important thing is to keep the core spirit of the project. Do not let complex processes kill the initial flexibility and creativity.",
            author: "Le B (Illustrative)",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop"
        },
        articles: {
            "design": [
                { id: "tk-2-1", title: "Colors Speak Up", desc: "Breaking the monochrome rule to create a strong focal point in the interface." },
                { id: "tk-2-2", title: "3D Space", desc: "When the flat plane is no longer enough to convey the depth of content." }
            ],
            "makers": [
                { id: "nl-2-1", title: "Remote Teamwork", desc: "Connecting and syncing when team members are thousands of miles apart." },
                { id: "nl-2-2", title: "First Hire", desc: "Lessons learned when searching for the perfect companion." }
            ],
            "tools": [
                { id: "cc-2-1", title: "Cloud Ecosystems", desc: "The flexibility of storing and sharing resources online." },
                { id: "cc-2-2", title: "Automation", desc: "Letting machines do the boring and repetitive tasks." }
            ]
        }
    }
};

// Generic article generator for sub-articles to save manual text
function getGenericArticleData(id, category, title, desc) {
    return {
        id: id,
        category: category,
        title: title,
        lead: desc,
        p1: "Detailed content for this article is currently being edited. In reality, this would be an expansion of the author's main idea based on the headline.",
        quote: "An interesting perspective always starts with the smallest observations.",
        p2: "Change does not happen overnight, but is the result of countless small improvements accumulated through daily work.",
        p3: "We will soon update the full content for this section. Thank you for always accompanying and reading.",
        author: "Reporter (Illustrative)"
    };
}

let currentEdition = 1;
let currentTab = 'design';
let scrollPosition = 0;

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initEditions();
    initForm();
    renderHome();
});

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => {
                t.classList.remove('bg-ink', 'text-newsprint', 'active');
                t.classList.add('hover:bg-neutral-100');
            });
            const target = e.target;
            target.classList.add('bg-ink', 'text-newsprint', 'active');
            target.classList.remove('hover:bg-neutral-100');
            currentTab = target.dataset.tab;
            renderCategory();
        });
    });
}

function initEditions() {
    const btns = document.querySelectorAll('.edition-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.currentTarget;
            currentEdition = parseInt(btnEl.dataset.edition);
            
            // Update UI for editions
            btns.forEach(b => {
                b.classList.add('text-neutral-500');
                b.querySelector('span:last-child').innerHTML = 'View &rarr;';
                b.querySelector('span:last-child').classList.remove('text-neutral-500');
            });
            btnEl.classList.remove('text-neutral-500');
            btnEl.querySelector('span:last-child').innerHTML = 'Viewing';
            btnEl.querySelector('span:last-child').classList.add('text-neutral-500');
            
            renderHome();
        });
    });
}

function renderHome() {
    const ed = data[currentEdition];
    
    // Update header
    document.getElementById('edition-number').innerText = currentEdition;
    const dateEls = document.querySelectorAll('header span');
    if(dateEls.length > 1) {
        dateEls[1].innerText = ed.date;
    }
    
    // Update Lead Story
    const leadHTML = `
        <div class="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-widest text-accent font-bold">
            <span>◆ ${ed.lead.category}</span>
        </div>
        <h2 class="font-display text-4xl lg:text-6xl font-black leading-[1.1] mb-4 group-hover:underline decoration-2 decoration-ink underline-offset-4">${ed.lead.title}</h2>
        <p class="font-body text-lg leading-relaxed text-neutral-800 mb-6 drop-cap">
            ${ed.lead.lead}
        </p>
        <div class="mt-auto relative border border-ink bg-muted aspect-video overflow-hidden">
            <div class="absolute inset-0 halftone-bg"></div>
            <img src="${ed.lead.image}" alt="Lead Image" class="w-full h-full object-cover newsprint-img relative z-10 opacity-90 transition-transform duration-500 group-hover:scale-105">
            <div class="absolute bottom-0 right-0 bg-newsprint border-t border-l border-ink px-2 py-1 font-mono text-[10px] uppercase z-20">Fig 1.${currentEdition}</div>
        </div>
    `;
    const leadEl = document.querySelector('.lg\\:col-span-6'); // Column 1
    leadEl.innerHTML = leadHTML;
    leadEl.onclick = () => openArticle(ed.lead);

    // Update current tab content
    renderCategory();
}

function renderCategory() {
    const articles = data[currentEdition].articles[currentTab];
    const container = document.getElementById('tab-content');
    
    const categoryName = document.querySelector(`.tab-btn[data-tab="${currentTab}"]`).innerText;

    container.innerHTML = articles.map((art, index) => `
        <article class="group cursor-pointer mb-6 last:mb-0 border-b border-ink pb-6 last:border-b-0 last:pb-0" onclick='openSubArticle("${art.id}", "${categoryName}", "${art.title}", "${art.desc}")'>
            <h3 class="font-display text-2xl font-bold mb-2 group-hover:text-accent transition-colors">${art.title}</h3>
            <p class="font-body text-neutral-600 text-sm leading-relaxed">${art.desc}</p>
        </article>
    `).join('');
}

function openSubArticle(id, category, title, desc) {
    const artData = getGenericArticleData(id, category, title, desc);
    openArticle(artData);
}

function openArticle(articleData) {
    // Save scroll position
    scrollPosition = window.scrollY;
    
    // Populate article view
    document.getElementById('article-category').innerText = `◆ ${articleData.category}`;
    document.getElementById('article-title').innerText = articleData.title;
    document.getElementById('article-author').innerText = articleData.author;
    document.getElementById('article-lead').innerText = articleData.lead;
    document.getElementById('article-p1').innerText = articleData.p1;
    document.getElementById('article-quote').innerText = articleData.quote;
    document.getElementById('article-p2').innerText = articleData.p2;
    document.getElementById('article-p3').innerText = articleData.p3;
    
    // Switch views
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-article').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function closeArticle() {
    document.getElementById('view-article').classList.add('hidden');
    document.getElementById('view-home').classList.remove('hidden');
    window.scrollTo(0, scrollPosition);
}

function initForm() {
    const form = document.getElementById('subscribe-form');
    const msg = document.getElementById('subscribe-message');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        if(email) {
            form.style.display = 'none';
            msg.innerHTML = `Demo subscription received for <br><span class="font-bold text-accent">${email}</span>.<br><br>Note: No actual email is collected.`;
            msg.classList.remove('hidden');
            msg.classList.add('block');
        }
    });
}
