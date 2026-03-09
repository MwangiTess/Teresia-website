document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Mobile Menu Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Lazy Loading Images ---
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// ─── Project Data ───────────────────────────────────────────────────────────
const projects = {
    bank: {
        title: "Bank Loan Analysis Dashboard",
        tags: ["SQL", "Power BI", "DAX", "SQL Server"],
        images: [
            "/assets/bank_loan/Summary.png",
            "/assets/bank_loan/Bank_loan_report.png",
            "/assets/bank_loan/Bank_loan_details.png"
        ],
        overview: `A comprehensive bank loan analysis system designed to transform raw lending data into actionable insights through an end-to-end data pipeline. The project monitors loan portfolio performance, distinguishes between performing ("Good") and non-performing ("Bad") loans, and identifies trends across time, geography, and borrower demographics to support data-driven decision-making.`,
        methodology: [
            "Data Extraction & Transformation (SQL Server): Wrote complex SQL queries using CTEs, window functions, and date operations. Performed data cleaning, aggregation, and transformation in SSMS.",
            "Data Modeling & DAX (Power BI): Built relationships and calculated measures using DAX. Implemented time intelligence functions for MTD and MoM comparisons. Created calculated columns for loan status classification.",
            "Interactive Dashboard Development: Designed three interconnected dashboards — Summary (high-level KPIs), Overview (trend analysis), and Details (granular exploration) — with cross-filtering and drill-down capabilities."
        ],
        results: [
            "Built interactive Power BI dashboards tracking 10+ KPIs including loan applications, funded amounts, repayments, interest rates, and debt-to-income ratios.",
            "Identified that 86% of loans were classified as 'Good' with consistent repayment patterns, while 'Bad' loans showed regional concentration.",
            "Discovered seasonal lending patterns with regional hotspots, enabling portfolio managers to monitor real-time loan performance and optimize lending strategies.",
            "Implemented advanced DAX calculations for time intelligence (MTD, MoM) and dynamic visualizations including filled maps, trend lines, and demographic breakdowns."
        ],
        github: "https://github.com/MwangiTess/Bank-Loan-Analysis"
    },
    water: {
        title: "Maji Ndogo Water Infrastructure Dashboard",
        tags: ["Power BI", "Data Modeling", "Budget Analysis", "DAX"],
        images: [
            "/assets/maji_ndogo/national.png",
            "/assets/maji_ndogo/province.png"
        ],
        overview: "A comprehensive water infrastructure analytics system designed to monitor and optimize budget allocation across the Maji Ndogo national water network. This Power BI dashboard provides critical insights into water access initiatives across five provinces (Akatsi, Amarzi, Hawassa, Kilimani, Sokoto), tracking infrastructure improvements, spending efficiency, and rural-urban disparities in resource distribution.",
        methodology: [
            "Data Integration: Consolidated regional water infrastructure data into unified Power BI data models with calculated measures for budget efficiency.",
            "Dashboard Architecture: Built two interconnected dashboards — National Analysis for KPIs and Provincial Analysis for granular insights.",
            "Interactive Features: Implemented bookmark-based navigation and toggle functionality (Province/Improvement) for dynamic report switching.",
            "Visual Analytics: Created comparative visualizations tracking budget allocation, improvement completion rates, and rural-urban disparities."
        ],
        results: [
            "Tracked and visualized $147M national water infrastructure budget with $40M specifically allocated to Sokoto province.",
            "Monitored completion rates across multiple improvement types including drill wells, RO filters, and public taps.",
            "Identified significant resource distribution gaps between rural and urban areas, informing more equitable funding decisions.",
            "Enabled government officials to monitor real-time performance across 5 provinces and optimize future infrastructure investments."
        ],
        github: "https://github.com/MwangiTess/maji-ndogo-water-analytics"
    }
    // Note: Retail Sales links directly to GitHub — no modal needed
};

// ─── Fallback image ──────────────────────────────────────────────────────────
const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage Not Available%3C/text%3E%3C/svg%3E';

// ─── Modal ───────────────────────────────────────────────────────────────────
const modal = document.getElementById('projectModal');
const closeBtn = document.getElementById('closeModal');
const projectCards = document.querySelectorAll('.project-card[data-project]');

projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const projectKey = this.dataset.project;

        // Retail card links to GitHub — don't open modal
        if (projectKey === 'retail') return;

        // Don't open modal when clicking the GitHub link inside retail card
        if (e.target.closest('a')) return;

        const project = projects[projectKey];
        if (project) openModal(project);
    });
});

async function openModal(project) {
    document.getElementById('modalTitle').textContent = project.title;
    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    document.getElementById('modalTags').innerHTML = tagsHTML;

    document.getElementById('modalBody').innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading project details...</p>
        </div>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const mainImg = new Image();
    mainImg.onload = () => renderModalContent(project);
    mainImg.onerror = () => renderModalContent(project);
    mainImg.src = project.images[0];
}

function renderModalContent(project) {
    const contentHTML = `
        <div class="image-gallery">
            <img src="${project.images[0]}" alt="${project.title}" class="main-image" id="mainImage"
                onerror="this.src='${FALLBACK_IMAGE}'">
            <div class="thumbnail-gallery">
                ${project.images.map((img, i) =>
                    `<img src="${img}" alt="Thumbnail ${i + 1}" class="thumbnail ${i === 0 ? 'active' : ''}"
                        data-index="${i}" onerror="this.src='${FALLBACK_IMAGE}'">`
                ).join('')}
            </div>
        </div>
        <div class="detail-section">
            <h3>Project Overview</h3>
            <p>${project.overview}</p>
        </div>
        <div class="detail-section">
            <h3>Methodology</h3>
            <ul>${project.methodology.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="detail-section">
            <h3>Key Results</h3>
            <ul>${project.results.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        ${project.github ? `
        <div class="project-links-section">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="github-link">
                <i class="fab fa-github"></i> View Source Code on GitHub
            </a>
        </div>` : ''}`;

    document.getElementById('modalBody').innerHTML = contentHTML;

    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = project.images[this.dataset.index];
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});