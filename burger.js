const burger = document.getElementById('burger');
const links = document.getElementById('mobile-links');

burger.addEventListener('click', () => {
    if (burger.classList.contains('rotate')) {
        // Gå tilbake til start
        burger.classList.remove('rotate');
        setTimeout(() => {
            burger.classList.remove('squish');
        }, 300); // matcher CSS-transition
    } else {
        // Start animasjonen
        burger.classList.add('squish');
        setTimeout(() => {
            burger.classList.add('rotate');
        }, 150); // delay før rotasjon (kan justeres)
    }

    links.classList.toggle("open")
});