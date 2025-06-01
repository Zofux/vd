if (window.matchMedia("(max-width: 800px)").matches) {
    // Run your JS code here for screens wider than 768px
    // Get DOM elements
    const section = document.getElementById('trackedSection-mobil');
    const fill = document.getElementById('progressFill-mobil');
    const cards = section.querySelectorAll('.track-card-mobil');
    const checkpoints = document.querySelectorAll('.checkpoint-mobil');

    // Position checkpoints based on <p> tag inside each card
    function placeCheckpoints() {
        const bar = document.querySelector('.progress-bar-mobil');
        const barRect = bar.getBoundingClientRect();
        const scrollY = window.scrollY;

        cards.forEach((card, index) => {
            const checkpoint = checkpoints[index];

            // Get <p> inside the card
            const paragraph = card.querySelector('h2');
            if (!paragraph) return; // skip if missing

            // Top of <p> relative to page
            const pY = paragraph.getBoundingClientRect().top + scrollY;

            // Top of progress bar relative to page
            const barY = barRect.top + scrollY;

            // Pixel offset from top of bar
            const offsetInBar = pY - barY;

            // Visually place checkpoint
            checkpoint.style.top = `${offsetInBar}px`;

            // Save pixel value for activation check
            checkpoint.dataset.pixel = offsetInBar;
        });
    }

    // Scroll event: update fill and activate checkpoints
    function handleScroll() {
        const bar = document.querySelector('.progress-bar-mobil');
        const barRect = bar.getBoundingClientRect();
        const barHeight = bar.offsetHeight;

        const sectionRect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = section.offsetHeight;

        const offsetStart = sectionHeight * 0.4;
        const scrollPosition = windowHeight - sectionRect.top;
        const progress = Math.min(Math.max((scrollPosition - offsetStart) / (sectionHeight - offsetStart), 0), 1);
        const progressPixels = progress * barHeight;

        // Update progress bar fill
        fill.style.height = `${progressPixels}px`;

        // Activate checkpoints
        checkpoints.forEach((checkpoint) => {
            const targetPixel = parseFloat(checkpoint.dataset.pixel);
            if (progressPixels >= targetPixel) {
                checkpoint.classList.add('active');
            } else {
                checkpoint.classList.remove('active');
            }
        });
    }

    // Init
    window.addEventListener('load', () => {
        placeCheckpoints();
        handleScroll();
    });

    window.addEventListener('resize', () => {
        placeCheckpoints()
        handleScroll()
    });
    window.addEventListener('scroll', handleScroll);
}