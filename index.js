document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check if user has a saved preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Switch Icon and Save Preference
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
        
        // Toggle icon between Hamburger (bars) and X (times)
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });
});

// Project data
const projects = {
    bank: {
        title: "Bank Loan Analysis Dashboard",
        tags: ["SQL", "Power BI", "Data Analysis", "DAX"],
        images: [
            "/Images/bank_loan/Summary.png",
            "/Images/bank_loan/Bank_loan_report.png",
            "/Images/bank_loan/Bank_loan_details.png"
        ],
        overview: `A comprehensive bank loan analysis system designed to transform raw lending data into actionable insights through an end-to-end data pipeline. The project addresses critical banking needs by monitoring loan portfolio performance, distinguishing between performing ("Good") and non-performing ("Bad") loans, and identifying trends across time, geography, and borrower demographics to support data-driven decision-making in portfolio management.`,
        methodology: [
            "Data Extraction & Transformation (SQL Server): Wrote complex SQL queries using CTEs, window functions, and date operations. Performed data cleaning, aggregation, and transformation in SSMS.",
            "Data Modeling & DAX (Power BI): Built relationships and calculated measures using DAX. Implemented time intelligence functions for MTD and MoM comparisons. Created calculated columns for loan status classification.",
            "Interactive Dashboard Development: Designed three interconnected dashboards - Summary (high-level KPIs), Overview (trend analysis), and Details (granular exploration). Implemented cross-filtering and drill-down capabilities."
        ],
        results: [
            "Dashboard Implementation: Created 3 interactive Power BI dashboards tracking 10+ KPIs including loan applications ($3.4M+ funded), repayments, interest rates, and debt-to-income ratios",
            "Portfolio Insights: Identified that 86% of loans were classified as 'Good' with consistent repayment patterns, while 'Bad' loans showed regional concentration",
            "Trend Identification: Discovered seasonal lending patterns with 15% increase in Q4 applications and regional hotspots in coastal states",
            "Decision Support: Enabled portfolio managers to monitor real-time loan performance, identify risk factors, and optimize lending strategies",
            "Technical Achievement: Reduced manual reporting time by 80% through automated ETL pipeline and self-service analytics"
        ],
        github: "https://github.com/MwangiTess/Bank-Loan-Analysis"
    },
    water: {
        title: "Maji Ndogo Water Infrastructure Dashboard",
        tags: ["Power BI", "Data Modeling", "Budget Analysis", "DAX"],
        images: [
            "/Images/maji_ndogo/national.png",
            "/Images/maji_ndogo/province.png"
        ],
        overview: "A comprehensive water infrastructure analytics system designed to monitor and optimize budget allocation across the Maji Ndodo national water network. This Power BI dashboard provides critical insights into water access initiatives across five provinces (Akatsi, Amarzi, Hawassa, Kilimani, Sokoto), tracking infrastructure improvements, spending efficiency, and addressing rural-urban disparities in water resource distribution.",
        methodology: [
            "Data Integration: Consolidated regional water infrastructure data into unified Power BI data models with calculated measures for budget efficiency",
            "Dashboard Architecture: Built two interconnected dashboards - National Analysis for KPIs and Provincial Analysis for granular insights",
            "Interactive Features: Implemented bookmark-based navigation and toggle functionality (Province/Improvement) for dynamic report switching",
            "Visual Analytics: Created comparative visualizations tracking budget allocation, improvement completion rates, and rural-urban disparities"
        ],
        results: [
            "Budget Management: Tracked and visualized $147M national water infrastructure budget with $40M specifically allocated to Sokoto province",
            "Infrastructure Monitoring: Monitored completion rates across multiple improvement types including drill wells, RO filters, and public taps",
            "Equity Analysis: Identified significant resource distribution gaps between rural and urban areas, informing more equitable funding decisions",
            "Stakeholder Impact: Enabled government officials to monitor real-time performance across 5 provinces and optimize future infrastructure investments"
        ],
        github: "https://github.com/MwangiTess/maji-ndogo-water-analytics"
    }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const closeBtn = document.getElementById('closeModal');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const projectKey = this.dataset.project;
        const project = projects[projectKey];
        openModal(project);
    });
});

function openModal(project) {
    document.getElementById('modalTitle').textContent = project.title;
    
    // Tags
    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    document.getElementById('modalTags').innerHTML = tagsHTML;
    
const bodyHTML = `
    <div class="image-gallery">
        <img src="${project.images[0]}" alt="${project.title}" class="main-image" id="mainImage">
        <div class="thumbnail-gallery">
            ${project.images.map((img, index) => 
                `<img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">`
            ).join('')}
        </div>
    </div>
    
    <div class="detail-section">
        <h3>Project Overview</h3>
        <p>${project.overview}</p>
    </div>
    
    <div class="detail-section">
        <h3>Methodology</h3>
        <ul>
            ${project.methodology.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </div>
    
    <div class="detail-section">
        <h3>Key Results</h3>
        <ul>
            ${project.results.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </div>

    <!-- Add GitHub link section BEFORE other sections if you want it prominent -->
    ${project.github ? `
    <div class="project-links-section">
        <a href="${project.github}" target="_blank" class="github-link">
            <i class="fab fa-github"></i> View Source Code on GitHub
        </a>
        ${project.liveDemo ? `
        <a href="${project.liveDemo}" target="_blank" class="demo-link">
            <i class="fas fa-external-link-alt"></i> Live Demo
        </a>` : ''}
    </div>
    ` : ''}
`;
    
    document.getElementById('modalBody').innerHTML = bodyHTML;
    
    // Add thumbnail click handlers
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = this.dataset.index;
            mainImage.src = project.images[index];
            
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});