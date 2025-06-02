document.querySelectorAll('.faq-card').forEach(card => {
    const top = card.querySelector('.faq-top');
    const answer = card.querySelector('.faq-svar');

    top.addEventListener('click', () => {
        const isActive = card.classList.contains('active');

        if (isActive) {
            // Collapse
            answer.style.height = answer.scrollHeight + 'px'; // set fixed height first (for transition)
            requestAnimationFrame(() => {
                answer.style.height = '0';
                answer.style.padding = "0"
            });
        } else {
            // Expand
            answer.style.height = answer.scrollHeight + 'px';
            answer.style.padding = "15px 0px 0px 0px"
        }

        card.classList.toggle('active');
    });

    // Reset height after transition (to allow content to grow/shrink dynamically)
    answer.addEventListener('transitionend', () => {
        if (card.classList.contains('active')) {
            answer.style.height = 'auto';
        }
    });
});
