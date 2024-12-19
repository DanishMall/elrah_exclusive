document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const progress = document.querySelector('.progress');
    let currentSlide = 0;
    let isTransitioning = false;
    let autoSlideInterval;

    function startProgressBar() {
        progress.classList.remove('active');
        void progress.offsetWidth; // Trigger reflow
        progress.classList.add('active');
    }

    function resetProgressBar() {
        progress.classList.remove('active');
    }

    function goToSlide(index) {
        if (isTransitioning || currentSlide === index) return;
        
        isTransitioning = true;
        resetProgressBar();

        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update current slide index
        currentSlide = index;

        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Start progress bar animation
        setTimeout(() => {
            startProgressBar();
        }, 100);

        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 1000); // Match this with CSS transition duration
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
        resetProgressBar(); // Automatically reset progress bar
        startProgressBar(); // Restart progress bar for the next slide
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }

    // Event Listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    // Initialize autoSlide
    resetAutoSlide();
    startProgressBar();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        }
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });

    // Touch events
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(autoSlideInterval);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', () => {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        resetAutoSlide();
    });
});
