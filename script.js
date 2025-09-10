
import { injectHeader } from './components/header.js';
import { injectFooter } from './components/footer.js';
import { injectServiceCards } from './components/services.js';
import { injectBookingSection } from './components/booking.js';
import { initCookieBanner } from './components/cookieBanner.js';

function initFaqAccordion() {
    const accordion = document.querySelector('.faq-accordion');
    if (!accordion) return;

    const items = accordion.querySelectorAll('.faq-item');
    items.forEach(item => {
        const button = item.querySelector('button');
        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Optional: Close all other items
            // items.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.classList.remove('open');
            //     }
            // });

            if (isOpen) {
                item.classList.remove('open');
            } else {
                item.classList.add('open');
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Inject components on all pages
    injectHeader();
    injectFooter();
    initCookieBanner();

    // Page-specific initializations
    if (document.getElementById('service-cards-container')) {
        injectServiceCards();
    }
    if (document.getElementById('consultant-cards-container')) {
        injectBookingSection();
    }
    if (document.querySelector('.faq-accordion')) {
        initFaqAccordion();
    }
});
    