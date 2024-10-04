// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // --------------------- Contact Form Validation --------------------- //
    const form = document.querySelector('form');

    // Validate form on submission
    form.addEventListener('submit', function(e) {
        // Get input values and trim whitespace
        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('email').value.trim();
        let message = document.getElementById('message').value.trim();

        // Validate that all fields are filled
        if (name === "" || email === "" || message === "") {
            e.preventDefault(); // Prevent form submission
            alert("All fields are required!"); // Alert user
        } else if (!validateEmail(email)) {
            e.preventDefault(); // Prevent form submission
            alert("Please enter a valid email address."); // Alert user
        }
    });

    // Email validation function
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email format
        return regex.test(email); // Test the email against the regex
    }

    // --------------------- Property Search and Filtering --------------------- //
    const searchInput = document.querySelector('input[type="text"]');
    const propertyType = document.querySelector('select');
    const minPrice = document.querySelector('input[placeholder="Min Price"]');
    const maxPrice = document.querySelector('input[placeholder="Max Price"]');
    const propertyCards = document.querySelectorAll('.card');

    // Filter properties on form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission

        // Get search criteria
        let searchText = searchInput.value.toLowerCase();
        let selectedType = propertyType.value;
        let min = parseInt(minPrice.value) || 0; // Set default to 0
        let max = parseInt(maxPrice.value) || Infinity; // Set default to Infinity

        // Filter property cards based on criteria
        propertyCards.forEach(function(card) {
            let title = card.querySelector('.card-title').textContent.toLowerCase();
            let price = parseInt(card.querySelector('.card-text:nth-of-type(2)').textContent.replace(/[^\d]/g, ''));
            let type = selectedType; // You might want to enhance this to map types accurately.

            // Show or hide card based on filtering criteria
            if (
                title.includes(searchText) &&
                price >= min &&
                price <= max &&
                (selectedType === "Property Type" || type === selectedType)
            ) {
                card.parentElement.style.display = 'block'; // Show card
            } else {
                card.parentElement.style.display = 'none'; // Hide card
            }
        });
    });

    // --------------------- Smooth Scroll to Property Listings --------------------- //
    document.querySelector('.btn-light').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default action
        document.querySelector('#property-listings').scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to property listings
    });

    // --------------------- Automatic Slideshow for Testimonials --------------------- //
    let currentIndex = 0;
    const testimonials = document.querySelectorAll('.blockquote');
    setInterval(() => {
        testimonials[currentIndex].style.display = 'none'; // Hide current testimonial
        currentIndex = (currentIndex + 1) % testimonials.length; // Move to next testimonial
        testimonials[currentIndex].style.display = 'block'; // Show next testimonial
    }, 5000); // Change testimonial every 5 seconds

    // --------------------- Highlight Navigation Links Based on Scroll Position --------------------- //
    window.addEventListener('scroll', function() {
        let sections = document.querySelectorAll('section');
        let navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(function(section, index) {
            if (window.scrollY >= section.offsetTop - 100) {
                navLinks.forEach((link) => link.classList.remove('active')); // Remove active class from all links
                navLinks[index].classList.add('active'); // Add active class to current section link
            }
        });
    });
});

// --------------------- Error Display Function --------------------- //
function showError(input, message) {
    const errorElement = document.createElement('div'); // Create error element
    errorElement.className = 'error-message'; // Set error class
    errorElement.innerText = message; // Set error message
    input.parentElement.appendChild(errorElement); // Append error to input's parent
}

// --------------------- Loading Spinner --------------------- //
const loadingSpinner = document.createElement('div');
loadingSpinner.className = 'spinner';
loadingSpinner.innerText = 'Loading...'; // Set loading message
document.body.appendChild(loadingSpinner); // Append loading spinner to body

// --------------------- Fetch Properties Data --------------------- //
fetch('properties.json')
    .then(response => response.json())
    .then(data => {
        // Update the property listings dynamically
    });

// --------------------- Modal for Property Details --------------------- //
const modal = document.querySelector('.modal');
propertyCards.forEach(card => {
    card.addEventListener('click', function() {
        modal.style.display = 'block'; // Show modal
        // Populate modal with property details here
    });
});

// --------------------- Smooth Scroll for Anchor Links --------------------- //
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to target
    });
});

// --------------------- Intersection Observer for Scroll Animations --------------------- //
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add visible class when in view
        }
    });
});
elementsToAnimate.forEach(element => {
    observer.observe(element); // Observe each element for visibility
});

// --------------------- Notification Function --------------------- //
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification'; // Set notification class
    notification.innerText = message; // Set notification message
    document.body.appendChild(notification); // Append notification to body
    setTimeout(() => notification.remove(), 3000); // Remove notification after 3 seconds
}