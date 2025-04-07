document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
    const textArray = ["IoT Developer", "Web Developer", "ML Enthusiast", "Programmer"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // Particles.js
    if(document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00f7ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00f7ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Header scroll effect
    const header = document.getElementById("header");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    
    window.addEventListener("scroll", function() {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");
    
    hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector(".back-to-top");
    
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add("active");
        } else {
            backToTopBtn.classList.remove("active");
        }
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // EmailJS integration
    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    
    if(contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Get form values
            const formData = {
                from_name: this.querySelector("[name='from_name']").value,
                from_email: this.querySelector("[name='from_email']").value,
                subject: this.querySelector("[name='subject']").value || "New Message from Portfolio",
                message: this.querySelector("[name='message']").value
            };
            
            // Send email
            emailjs.send("service_v8sn8vs", "template_p50whmw", formData)
                .then(function(response) {
                    // Success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'alert success';
                    successMsg.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <span>Thank you! Your message has been sent.</span>
                    `;
                    contactForm.parentNode.insertBefore(successMsg, contactForm);
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        successMsg.classList.add('fade-out');
                        setTimeout(() => successMsg.remove(), 500);
                    }, 5000);
                    
                    // Reset form
                    contactForm.reset();
                }, function(error) {
                    // Error message
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'alert error';
                    errorMsg.innerHTML = `
                        <i class="fas fa-exclamation-circle"></i>
                        <span>Oops! Something went wrong. Please try again.</span>
                    `;
                    contactForm.parentNode.insertBefore(errorMsg, contactForm);
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        errorMsg.classList.add('fade-out');
                        setTimeout(() => errorMsg.remove(), 500);
                    }, 5000);
                    
                    console.error("EmailJS error:", error);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Scroll reveal animations
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    sr.reveal('.home-content, .section-title', {});
    sr.reveal('.about-img, .contact-info', {origin: 'left'});
    sr.reveal('.about-text, .contact-form', {origin: 'right'});
    sr.reveal('.timeline-item, .education-card, .skills-category, .project-card', {interval: 200});
});