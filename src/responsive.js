// Retrieving elements for Mobile Responsiveness
const toggleButton = document.getElementsByClassName('menu-button')[0];
const navMenu = document.getElementsByClassName('nav-container')[0];

// Retrieving Dark Mode Button
const darkModeButton = document.querySelector(".darkmode-btn");

// Retrieving containers for Dark Mode
const homeContainer = document.querySelectorAll("[data-dark]")
const colorOnly = document.querySelectorAll("[data-dark-only]")

// menuButton EvenListener
toggleButton.addEventListener('click', () =>{
    navMenu.classList.toggle('active');
})

// darkModeButton EventListener
darkModeButton.addEventListener('click', () => {
    darkModeButton.classList.toggle('dark') 
    
    // For each container, toggle .dark class
    homeContainer.forEach(container =>{
        container.classList.toggle("dark")
    })

    // For each container, toggle .dark class
    colorOnly.forEach(container => {
        container.classList.toggle("dark")
    })
})