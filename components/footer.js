
export function injectFooter() {
    const footerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-column">
                    <h4>Nunexa</h4>
                    <p>Connecting Ambition with Expertise. Your strategic partner for growth in Europe.</p>
                </div>
                <div class="footer-column">
                    <h4>Navigate</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about/">About Us</a></li>
                        <li><a href="/services/">Services</a></li>
                        <li><a href="/insights/">Insights</a></li>
                        <li><a href="/contact/">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="/faq/">FAQ</a></li>
                        <li><a href="/careers/">Careers</a></li>
                        <li><a href="/press/">Press</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Contact Us</h4>
                    <ul>
                        <li><a href="mailto:contact@nunexa.net">contact@nunexa.net</a></li>
                        <li><span>+33 1 23 45 67 89</span></li>
                        <li><span>123 Business Avenue, Paris</span></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Nunexa. All rights reserved.</p>
            </div>
        </div>
    `;

    document.getElementById('main-footer').innerHTML = footerHTML;
}
    