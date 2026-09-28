const data = {
    1: {
        name: "Vol. 1: Tối Giản",
        date: "28 THÁNG 9, 2026",
        lead: {
            id: "lead-1",
            category: "Tiêu Điểm",
            title: "Khi Một Ý Tưởng Cần Ít Thứ Hơn",
            lead: "Đôi khi, cách tốt nhất để phát triển một dự án không phải là thêm tính năng, mà là mạnh dạn cắt bỏ đi những gì không cần thiết.",
            p1: "Trong giai đoạn đầu của dự án, chúng ta thường bị cám dỗ bởi việc xây dựng mọi thứ. Mỗi ý tưởng mới đều có vẻ hấp dẫn và cần thiết. Tuy nhiên, việc ôm đồm quá nhiều thường dẫn đến một sản phẩm mờ nhạt, thiếu trọng tâm và khó hoàn thiện.",
            quote: "Cắt bỏ không phải là mất đi, mà là làm rõ những gì còn lại.",
            p2: "Rút gọn phạm vi không đồng nghĩa với việc hạ thấp tiêu chuẩn. Ngược lại, nó đòi hỏi sự khắt khe hơn trong việc đánh giá xem điều gì thực sự mang lại giá trị. Bằng cách tập trung vào một vấn đề duy nhất và giải quyết nó thật tốt, dự án nhỏ của bạn sẽ có cơ hội tồn tại và phát triển.",
            p3: "Cuối cùng, một sản phẩm hoàn thiện với ít tính năng vẫn tốt hơn một bản nháp dang dở với hàng tá ý tưởng. Hãy bắt đầu nhỏ, làm thật tốt, và chỉ mở rộng khi thực sự cần thiết.",
            author: "Trần A (Minh họa)",
            image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop"
        },
        articles: {
            "thiet-ke": [
                { id: "tk-1-1", title: "Lưới Không Chỉ Để Ngắm", desc: "Khi mọi đường kẻ đều có chức năng và tạo nên cấu trúc vững chắc." },
                { id: "tk-1-2", title: "Bóng Đổ Đã Chết?", desc: "Sự trỗi dậy của thiết kế phẳng sắc nét và sự biến mất của drop shadow." }
            ],
            "nguoi-lam": [
                { id: "nl-1-1", title: "Bắt Đầu Từ Con Số Không", desc: "Hành trình xây dựng dự án đầu tay từ những dòng code lộn xộn." },
                { id: "nl-1-2", title: "Code Cũng Là Nghệ Thuật", desc: "Góc nhìn của một lập trình viên về cái đẹp trong cấu trúc dữ liệu." }
            ],
            "cong-cu": [
                { id: "cc-1-1", title: "Bút Chì Và Giấy", desc: "Công cụ mạnh mẽ nhất để phác thảo ý tưởng trước khi mở máy tính." },
                { id: "cc-1-2", title: "Bàn Phím Cơ", desc: "Cảm giác gõ, âm thanh lách cách và tốc độ làm việc được cải thiện." }
            ]
        }
    },
    2: {
        name: "Vol. 2: Mở Rộng",
        date: "15 THÁNG 10, 2026",
        lead: {
            id: "lead-2",
            category: "Tiêu Điểm",
            title: "Sẵn Sàng Cho Bước Nhảy Vọt",
            lead: "Khi một dự án nhỏ bắt đầu có lượng người dùng ổn định, đã đến lúc nghĩ về một hệ thống lớn hơn và vững chãi hơn.",
            p1: "Khởi đầu nhỏ giúp chúng ta đi nhanh, nhưng để đi xa, dự án cần một nền tảng vững chắc. Việc mở rộng không chỉ đơn thuần là mua thêm máy chủ hay viết thêm tính năng mới. Đó là quá trình tái cấu trúc lại toàn bộ cách chúng ta tư duy và làm việc.",
            quote: "Mở rộng không chỉ là thêm người, mà là thêm không gian cho sự sáng tạo.",
            p2: "Những khó khăn trong việc mở rộng quy mô thường đến từ các khoản nợ kỹ thuật (technical debt) tích tụ từ những ngày đầu. Chúng ta phải học cách trả những món nợ này trước khi chúng làm sụp đổ toàn bộ hệ thống đang vận hành.",
            p3: "Dù quy mô có lớn đến đâu, điều quan trọng nhất vẫn là giữ được tinh thần cốt lõi của dự án. Đừng để những quy trình phức tạp giết chết sự linh hoạt và tính sáng tạo ban đầu.",
            author: "Lê B (Minh họa)",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop"
        },
        articles: {
            "thiet-ke": [
                { id: "tk-2-1", title: "Màu Sắc Lên Tiếng", desc: "Phá vỡ quy tắc đơn sắc để tạo điểm nhấn mạnh mẽ trong giao diện." },
                { id: "tk-2-2", title: "Không Gian 3D", desc: "Khi mặt phẳng không còn đủ để truyền tải chiều sâu của nội dung." }
            ],
            "nguoi-lam": [
                { id: "nl-2-1", title: "Làm Việc Nhóm Từ Xa", desc: "Gắn kết và đồng bộ khi các thành viên cách nhau hàng vạn dặm." },
                { id: "nl-2-2", title: "Tuyển Dụng Đầu Tiên", desc: "Những bài học rút ra khi tìm kiếm người đồng hành hoàn hảo." }
            ],
            "cong-cu": [
                { id: "cc-2-1", title: "Hệ Sinh Thái Đám Mây", desc: "Sự linh hoạt của việc lưu trữ và chia sẻ tài nguyên trực tuyến." },
                { id: "cc-2-2", title: "Tự Động Hóa", desc: "Để máy móc làm những công việc nhàm chán và lặp đi lặp lại." }
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
        p1: "Nội dung chi tiết cho bài viết này hiện đang được biên tập. Trong thực tế, đây sẽ là phần mở rộng ý chính của tác giả dựa trên tiêu đề bài báo.",
        quote: "Một góc nhìn thú vị luôn bắt nguồn từ những quan sát nhỏ nhất.",
        p2: "Sự thay đổi không diễn ra trong một đêm, mà là kết quả của vô số những cải tiến nhỏ nhặt được tích lũy qua từng ngày làm việc.",
        p3: "Chúng tôi sẽ sớm cập nhật đầy đủ nội dung cho phần này. Cảm ơn bạn đã luôn đồng hành và đón đọc.",
        author: "Phóng viên (Minh họa)"
    };
}

let currentEdition = 1;
let currentTab = 'thiet-ke';
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
                b.querySelector('span:last-child').innerHTML = 'Xem &rarr;';
                b.querySelector('span:last-child').classList.remove('text-neutral-500');
            });
            btnEl.classList.remove('text-neutral-500');
            btnEl.querySelector('span:last-child').innerHTML = 'Đang xem';
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
    // clear and replace inner HTML except we need to keep the onclick binding if we rewrite
    // It's better to just replace innerHTML, the onclick is inline in the HTML element
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
            msg.innerHTML = `Đã ghi nhận yêu cầu thử nghiệm cho <br><span class="font-bold text-accent">${email}</span>.<br><br>Lưu ý: Không có email thật nào được lưu.`;
            msg.classList.remove('hidden');
            msg.classList.add('block');
        }
    });
}
