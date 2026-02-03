document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (menuBtn && closeBtn) {
        menuBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Logic
    const bookingForm = document.getElementById('bookingForm');
    const feedback = document.getElementById('formFeedback');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation simulation
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = 'Processing...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                feedback.classList.remove('hidden');
                feedback.classList.add('success');
                feedback.innerHTML = '<strong>Success!</strong> Your booking request has been received. We will call you shortly.';

                bookingForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;

                // Hide feedback after 5 seconds
                setTimeout(() => {
                    feedback.classList.add('hidden');
                    feedback.classList.remove('success');
                }, 5000);
            }, 1500);
        });
    }

    // Scroll Effect for Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px -10px rgba(2,12,27,0.7)";
            navbar.style.padding = "15px 0";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "20px 0";
        }
    });
});
