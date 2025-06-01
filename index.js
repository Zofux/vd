const toggle = document.getElementById('mode');
const root = document.documentElement;
const currentTheme = localStorage.getItem('theme');

// Apply theme on load
if (currentTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    toggle.className = "fa-solid fa-sun";
} else {
    root.setAttribute('data-theme', 'light');
    toggle.className = "fa-solid fa-moon";
}

// Toggle theme on click
toggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    toggle.className = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";
});


const text = "Kode som fungerer\"";
const text2 = "Å lage nettsider er vanskelig, hos oss er det enkelt.";

const element = document.getElementById("typewriter");
const element2 = document.getElementById("typewriter-2");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function type(text, target, speed = 50) {
    for (let i = 0; i < text.length; i++) {
        target.textContent += text[i];
        await sleep(speed);
    }
}

window.onload = async function () {
    await sleep(500); // delay før første tekst
    await type(text, element, 50);
    await type(text2, element2, 40);
};


if (window.matchMedia("(min-width: 800px)").matches) {
    // Get DOM elements
    const section = document.getElementById('trackedSection');
    const fill = document.getElementById('progressFill');
    const cards = section.querySelectorAll('.track-card');
    const checkpoints = document.querySelectorAll('.checkpoint');

    // Position checkpoints based on <p> tag inside each card
    function placeCheckpoints() {
        const bar = document.querySelector('.progress-bar');
        const barRect = bar.getBoundingClientRect();
        const scrollY = window.scrollY;

        cards.forEach((card, index) => {
            const checkpoint = checkpoints[index];

            // Get <p> inside the card
            const paragraph = card.querySelector('p');
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
        const bar = document.querySelector('.progress-bar');
        const barRect = bar.getBoundingClientRect();
        const barHeight = bar.offsetHeight;

        const sectionRect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = section.offsetHeight;

        const offsetStart = sectionHeight * 0.2;
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
