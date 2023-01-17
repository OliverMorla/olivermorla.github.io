const toggleButton = document.getElementsByClassName('menu-btn')[0];
const navbarLinks = document.getElementsByClassName('nav-links-container')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})