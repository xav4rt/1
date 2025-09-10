const consultantsData = [
    {
        name: "Jean-Luc Moreau",
        title: "Founder & Chief Strategist",
        price: "€250 / 45 min session",
        imgSeed: "leader1"
    },
    {
        name: "Sofia Costa",
        title: "Head of Client Relations",
        price: "€200 / 45 min session",
        imgSeed: "leader2"
    },
    {
        name: "Markus Weber",
        title: "Director of Event Operations",
        price: "€225 / 45 min session",
        imgSeed: "leader3"
    }
];

const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;
let selectedTime = null;

function renderCalendar(month, year) {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;

    calendarGrid.innerHTML = '';
    const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
    document.getElementById('month-name').textContent = `${monthName} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // Add weekday headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const weekdayEl = document.createElement('div');
        weekdayEl.classList.add('weekday');
        weekdayEl.textContent = day;
        calendarGrid.appendChild(weekdayEl);
    });

    // Add empty cells for the first days
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('day', 'empty');
        calendarGrid.appendChild(emptyCell);
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.textContent = day;
        dayCell.dataset.day = day;

        const date = new Date(year, month, day);
        if (date < today.setHours(0,0,0,0) || date.getDay() === 0 || date.getDay() === 6) {
            dayCell.classList.add('disabled');
        }

        if (selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
             dayCell.classList.add('selected');
        }

        calendarGrid.appendChild(dayCell);
    }
}

function updateBookingSummary() {
    const summaryEl = document.getElementById('booking-summary-text');
    const consultantName = document.querySelector('.modal-header h2').textContent.replace('Book with ','');
    
    let summaryText = `Booking with ${consultantName}`;
    if (selectedDate) {
        summaryText += ` on ${selectedDate.toLocaleDateString()}`;
    }
    if (selectedTime) {
        summaryText += ` at ${selectedTime}`;
    }
    summaryEl.textContent = summaryText;
    validateForm();
}

function validateForm() {
    const confirmBtn = document.getElementById('confirm-booking-btn');
    if(!confirmBtn) return;
    
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;

    if (selectedDate && selectedTime && firstName && lastName && email) {
        confirmBtn.disabled = false;
    } else {
        confirmBtn.disabled = true;
    }
}


function createBookingModal(consultant) {
    const modalHTML = `
        <div class="booking-modal-overlay">
            <div class="booking-modal">
                <div class="booking-modal-content">
                    <div class="modal-header">
                        <div>
                            <h2>Book with ${consultant.name}</h2>
                            <p>${consultant.title}</p>
                        </div>
                        <button class="modal-close-btn">&times;</button>
                    </div>

                    <div class="booking-steps">
                        <div class="booking-step">
                            <h4>1. Select a Date</h4>
                            <div class="calendar">
                                <div class="calendar-header">
                                    <button id="prev-month">&larr;</button>
                                    <span id="month-name"></span>
                                    <button id="next-month">&rarr;</button>
                                </div>
                                <div class="calendar-grid"></div>
                            </div>
                        </div>
                        <div class="booking-step">
                            <h4>2. Select a Time</h4>
                            <div class="time-slots-grid">
                                ${availableTimes.map(time => `<button class="time-slot">${time}</button>`).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="booking-form">
                         <h4>3. Your Details</h4>
                         <div class="contact-grid">
                             <div class="form-group">
                                 <label for="first-name">First Name</label>
                                 <input type="text" id="first-name" required>
                             </div>
                             <div class="form-group">
                                 <label for="last-name">Last Name</label>
                                 <input type="text" id="last-name" required>
                             </div>
                         </div>
                         <div class="form-group">
                             <label for="email">Email</label>
                             <input type="email" id="email" required>
                         </div>
                    </div>
                     <div class="booking-summary">
                        <p id="booking-summary-text">Select a date and time to see your summary.</p>
                     </div>
                    <button id="confirm-booking-btn" class="cta-button" disabled>Confirm Appointment</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('booking-modal-container').innerHTML = modalHTML;
    
    const overlay = document.querySelector('.booking-modal-overlay');
    
    // Animate in
    setTimeout(() => overlay.classList.add('visible'), 10);

    renderCalendar(currentMonth, currentYear);
    addModalEventListeners();
}

function addModalEventListeners() {
    const overlay = document.querySelector('.booking-modal-overlay');
    const closeBtn = document.querySelector('.modal-close-btn');
    
    const closeModal = () => {
        overlay.classList.remove('visible');
        setTimeout(() => {
             overlay.remove();
             // Reset state
             selectedDate = null;
             selectedTime = null;
             currentMonth = new Date().getMonth();
             currentYear = new Date().getFullYear();
        }, 300);
    };

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    closeBtn.addEventListener('click', closeModal);

    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    document.querySelector('.calendar-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('day') && !e.target.classList.contains('disabled') && !e.target.classList.contains('empty')) {
            const day = parseInt(e.target.dataset.day);
            selectedDate = new Date(currentYear, currentMonth, day);
            
            // remove selected from others
            document.querySelectorAll('.day.selected').forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');
            updateBookingSummary();
        }
    });

    document.querySelector('.time-slots-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('time-slot')) {
            selectedTime = e.target.textContent;
             document.querySelectorAll('.time-slot.selected').forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');
            updateBookingSummary();
        }
    });

    document.querySelectorAll('.booking-form input').forEach(input => {
        input.addEventListener('input', validateForm);
    });
    
    document.getElementById('confirm-booking-btn').addEventListener('click', () => {
        alert('Appointment confirmed! (This is a demo). You will receive a confirmation email shortly.');
        closeModal();
    });
}

export function injectBookingSection() {
    const container = document.getElementById('consultant-cards-container');
    if (!container) return;

    let cardsHTML = '';
    consultantsData.forEach(consultant => {
        cardsHTML += `
            <div class="consultant-card" data-consultant='${JSON.stringify(consultant)}'>
                <div class="consultant-card-img">
                    <img src="https://picsum.photos/seed/${consultant.imgSeed}/200/200" alt="Photo of ${consultant.name}">
                </div>
                <h3>${consultant.name}</h3>
                <p class="title">${consultant.title}</p>
                <p class="price">${consultant.price}</p>
                <button class="cta-button secondary">Book Now</button>
            </div>
        `;
    });
    container.innerHTML = cardsHTML;

    container.addEventListener('click', (e) => {
        const card = e.target.closest('.consultant-card');
        if (card && e.target.tagName === 'BUTTON') {
            const consultantData = JSON.parse(card.dataset.consultant);
            createBookingModal(consultantData);
        }
    });
}
