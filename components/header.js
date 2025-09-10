
export function injectHeader() {
    const headerHTML = `
        <div class="container header-container">
            <a href="/" class="logo">Nunexa</a>
            <nav class="main-nav">
                <ul>
                    <li><a href="/about/">About Us</a></li>
                    <li><a href="/services/">Services</a></li>
                    <li><a href="/insights/">Insights</a></li>
                    <li><a href="/contact/">Contact</a></li>
                </ul>
            </nav>
            <div class="header-cta">
                <a href="/contact/" class="cta-button secondary">SCHEDULE NOW</a>
            </div>
            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
        </div>
    `;

    document.getElementById('main-header').innerHTML = headerHTML;

    // --- Active Page Link Logic ---
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        // Handle homepage case
        if (link.getAttribute('href') === '/' && currentPage === '/index.html') {
             link.classList.add('active');
        }
        // Handle other pages
        else if (currentPage.startsWith(link.getAttribute('href')) && link.getAttribute('href') !== '/') {
            link.classList.add('active');
        }
    });


    // --- Mobile Menu Toggle Functionality ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Close menu when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            });
        });
    }
}
