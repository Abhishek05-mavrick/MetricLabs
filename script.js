// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    initialSlide: 1,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true
    },
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1200: {
            slidesPerView: 2.5,
            spaceBetween: 40
        },
        1600: {
            slidesPerView: 3,
            spaceBetween: 40
        }
    }
});

// Add hover effect to pause autoplay
const swiperContainer = document.querySelector('.swiper-container');
swiperContainer.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
});
swiperContainer.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
});

// About Section Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

// Observe all about cards
document.querySelectorAll('.about-card').forEach(card => {
    observer.observe(card);
});

// Navbar Functionality
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar scroll behavior
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Ensure navbar is visible on page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Create mailto URL
    const mailtoUrl = `mailto:${formData.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open default email client
    window.location.href = mailtoUrl;

    // Clear form
    this.reset();
});

// Tech Icons Animation
const techIcons = document.querySelectorAll('.tech-icons-container i');

techIcons.forEach(icon => {
    const speed = parseFloat(icon.getAttribute('data-speed'));
    const color = icon.getAttribute('data-color');
    
    // Set initial color
    icon.style.color = color;
    
    // Add random slight rotation
    const rotation = Math.random() * 20 - 10; // Random rotation between -10 and 10 degrees
    icon.style.transform = `rotate(${rotation}deg)`;
    
    // Add custom animation duration based on speed
    icon.style.animationDuration = `${speed * 2}s`;
});

// Add scroll-based opacity
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    techIcons.forEach(icon => {
        const speed = parseFloat(icon.getAttribute('data-speed'));
        const opacity = Math.max(0.3, 1 - (scrolled * 0.001 * speed));
        icon.style.opacity = opacity;
    });
});

// Floating Tech Icons Animation
const techIconsList = [
    'fa-python',
    'fa-react',
    'fa-js',
    'fa-node',
    'fa-aws',
    'fa-docker',
    'fa-github',
    'fa-brain',
    'fa-robot',
    'fa-microchip',
    'fa-code'
];

function createFloatingIcon() {
    const iconContainer = document.querySelector('.floating-icons');
    if (!iconContainer) return;

    const icon = document.createElement('i');
    const randomIcon = techIconsList[Math.floor(Math.random() * techIconsList.length)];
    const isRegular = ['fa-brain', 'fa-robot', 'fa-microchip', 'fa-code'].includes(randomIcon);
    
    icon.className = `${isRegular ? 'fas' : 'fab'} ${randomIcon}`;
    
    // Random starting position
    const startX = Math.random() * 100;
    const startScale = 0.5 + Math.random() * 0.5;
    const duration = 10 + Math.random() * 10;
    const delay = Math.random() * 5;
    
    icon.style.cssText = `
        left: ${startX}%;
        font-size: ${16 + Math.random() * 12}px;
        animation: float-up ${duration}s linear ${delay}s;
        transform: translateY(100vh) scale(${startScale});
    `;
    
    iconContainer.appendChild(icon);
    
    // Remove the icon after animation completes
    setTimeout(() => {
        icon.remove();
    }, (duration + delay) * 1000);
}

// Create new icons periodically
function startFloatingIcons() {
    // Create initial batch of icons
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingIcon, i * 300);
    }
    
    // Continue creating new icons
    setInterval(createFloatingIcon, 2000);
}

// Start floating icons when page loads
document.addEventListener('DOMContentLoaded', () => {
    startFloatingIcons();
});
