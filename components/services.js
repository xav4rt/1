
const servicesData = [
    {
        icon: `
            <svg class="icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20V10"></path>
                <path d="M18 20V4"></path>
                <path d="M6 20v-4"></path>
            </svg>`,
        title: "Expert Consulting",
        description: "Leverage our deep industry knowledge to solve your most complex challenges, from market entry strategy to operational efficiency."
    },
    {
        icon: `
            <svg class="icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M12 14v4"></path>
                <path d="M10 16h4"></path>
            </svg>`,
        title: "Professional Appointment Scheduling",
        description: "Streamline your executive calendars with our efficient and confidential appointment management service, ensuring you never miss a critical meeting."
    },
    {
        icon: `
            <svg class="icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
            </svg>`,
        title: "Executive Event Planning",
        description: "From high-stakes board meetings to large-scale corporate summits, we manage every detail to deliver flawless and impactful executive events."
    }
];

export function injectServiceCards() {
    const container = document.getElementById('service-cards-container');
    if (!container) return;

    let cardsHTML = '';
    servicesData.forEach(service => {
        cardsHTML += `
            <div class="service-card">
                ${service.icon}
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `;
    });

    container.innerHTML = cardsHTML;
}
