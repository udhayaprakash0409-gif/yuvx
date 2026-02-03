// Outstation Logic

// Constants
const BASE_RATE_PER_DAY = 700; // Base driver allowance
const RATE_PER_KM = 3; // Driver charge per km (assuming fuel is user's)
const RETURN_TRIP_MULTIPLIER = 1.8; // Estimate return distance

// Elements
const daysInput = document.getElementById('daysRange');
const kmInput = document.getElementById('kmRange');
const daysValue = document.getElementById('daysValue');
const kmValue = document.getElementById('kmValue');
const returnTripCheck = document.getElementById('returnTrip');
const totalPriceEl = document.getElementById('totalPrice');
const bookBtn = document.getElementById('bookBtn');

// Wizard Elements
const steps = document.querySelectorAll('.form-step');
const dots = document.querySelectorAll('.step-dot');
const nextBtns = document.querySelectorAll('.btn-next');
const prevBtns = document.querySelectorAll('.btn-prev');
let currentStep = 0;

function init() {
    updatePrice();
    setupListeners();
}

function setupListeners() {
    daysInput.addEventListener('input', updatePrice);
    kmInput.addEventListener('input', updatePrice);
    returnTripCheck.addEventListener('change', updatePrice);

    // Smooth scroll to booking
    bookBtn.addEventListener('click', () => {
        document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth' });
    });

    // Wizard Navigation
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });
}

function updatePrice() {
    // Update Display Values
    const days = parseInt(daysInput.value);
    const km = parseInt(kmInput.value);

    daysValue.textContent = days + (days === 1 ? ' Day' : ' Days');
    kmValue.textContent = km + ' km';

    // Calculate Cost
    let totalKm = km;
    // For calculation only, we assume if they select 100km, that's one way, so return is 2x? 
    // Or we stick to simple logic: Input is TOTAL estimated km.
    // Let's assume input is one-way distance for better UX

    if (returnTripCheck.checked) {
        totalKm = km * 2;
    }

    // Cost formula: (Days * Base) + (TotalKM * Rate)
    // Note: This is driver BATTA + Commission roughly
    let estimatedCost = (days * BASE_RATE_PER_DAY) + (totalKm * RATE_PER_KM);

    // Animate Number
    animateValue(totalPriceEl, parseInt(totalPriceEl.textContent.replace(/\D/g, '')) || 0, estimatedCost, 500);
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = "₹" + Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.classList.remove('active');
        if (index === stepIndex) step.classList.add('active');
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index <= stepIndex);
    });
}

function validateStep(stepIndex) {
    // Add real validation here
    return true;
}

// Start
document.addEventListener('DOMContentLoaded', init);
