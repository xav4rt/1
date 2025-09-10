
const COOKIE_CONSENT_KEY = 'nunexa_cookie_consent';

function createCookieBanner() {
    const bannerHTML = `
        <div class="cookie-banner" id="cookie-banner">
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <p>This website uses cookies to ensure you get the best experience. By continuing to use this site, you agree to our use of cookies.</p>
                </div>
                <div class="cookie-banner-actions">
                    <button id="cookie-accept" class="cta-button">ACCEPT</button>
                    <button id="cookie-decline">Decline</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        banner.classList.remove('visible');
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
        banner.classList.remove('visible');
    });

    return banner;
}

export function initCookieBanner() {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!consent) {
        const banner = createCookieBanner();
        // Use a short timeout to allow the page to render before sliding in the banner
        setTimeout(() => {
            banner.classList.add('visible');
        }, 500);
    }
}
    