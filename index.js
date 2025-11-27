/**
 * ====================================================================
 * Portfolio Website - JavaScript
 * ====================================================================
 * Handles all interactive features including:
 * - Smooth scrolling
 * - Animations on scroll
 * - Certificate filtering
 * - Mobile navigation
 * - Form submission
 * - Improved UX interactions
 * ====================================================================
 */

// =====================================================
// 1. SMOOTH SCROLLING
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// =====================================================
// 2. NAVBAR SCROLL EFFECT
// =====================================================
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(255, 255, 255, 0.98)";
    nav.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
    nav.classList.add("scrolled");
  } else {
    nav.style.background = "rgba(255, 255, 255, 0.95)";
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    nav.classList.remove("scrolled");
  }
});

// =====================================================
// 3. MOBILE NAVIGATION TOGGLE
// =====================================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("open");
});

// Close menu when clicking on a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("open");
  });
});

// =====================================================
// 4. SKILL CARDS - SCROLL REVEAL ANIMATION
// =====================================================
const skillCards = document.querySelectorAll(".skill-category");

const skillCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
      }
    });
  },
  { threshold: 0.2 }
);

skillCards.forEach((card) => {
  skillCardObserver.observe(card);
});

// Add tooltip on skill hover
skillCards.forEach((card) => {
  const skillSpans = card.querySelectorAll(".skill-name span");
  skillSpans.forEach((span) => {
    span.addEventListener("mouseenter", function () {
      this.style.cursor = "default";
    });
  });
});

// =====================================================
// 5. ANIMATED COUNTER - STATISTICS SECTION
// =====================================================
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          if (counter.textContent === "0") {
            animateCounter(counter);
          }
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  counterObserver.observe(statsSection);
}

// =====================================================
// 6. CERTIFICATE FILTERS - UNIFIED IMPLEMENTATION
// =====================================================
const filterButtons = document.querySelectorAll(".cert-filters button");
const certCards = document.querySelectorAll(".cert-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Remove active state from all buttons
    filterButtons.forEach((b) => b.classList.remove("active"));

    // Add active to clicked button
    btn.classList.add("active");

    // Filter certificate cards with smooth animation
    certCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
        // Trigger animation
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 10);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        setTimeout(() => (card.style.display = "none"), 200);
      }
    });
  });
});

// Set first filter button as active on page load
if (filterButtons.length > 0) {
  filterButtons[0].classList.add("active");
}

// =====================================================
// 7. CERTIFICATE "SHOW MORE" FUNCTIONALITY
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".cert-card");
  const maxShow = 6;
  let isExpanded = false;

  // Hide all cards except first 6
  cards.forEach((card, index) => {
    if (index >= maxShow) {
      card.style.display = "none";
      card.classList.add("hidden-cert");
    }
  });

  // Create "Show More" button
  const btn = document.createElement("button");
  btn.textContent = "Lihat Selengkapnya";
  btn.className = "btn-show-more";
  const certContainer = document.querySelector(".certifications .container");
  certContainer.appendChild(btn);

  // Toggle button functionality
  btn.addEventListener("click", () => {
    const hiddenCards = document.querySelectorAll(".hidden-cert");
    isExpanded = !isExpanded;

    if (isExpanded) {
      hiddenCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.3s ease";
        }, index * 50);
      });
      btn.textContent = "Sembunyikan";
      btn.style.background = "linear-gradient(135deg, #dc2626, #f87171)";
    } else {
      hiddenCards.forEach((card) => (card.style.display = "none"));
      btn.textContent = "Lihat Selengkapnya";
      btn.style.background = "";
    }
  });
});

// =====================================================
// 8. CONTACT FORM SUBMISSION WITH VALIDATION
// =====================================================
function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Validate form fields
  if (!data.name.trim()) {
    alert("Silahkan masukkan nama!");
    return;
  }

  if (!data.email.trim() || !isValidEmail(data.email)) {
    alert("Silahkan masukkan email yang valid!");
    return;
  }

  if (!data.message.trim()) {
    alert("Silahkan masukkan pesan!");
    return;
  }

  // Show success message
  alert(
    `Terima kasih ${data.name}! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda di ${data.email}`
  );
  e.target.reset();
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// =====================================================
// 9. "MORE PROJECTS" BUTTON - REDIRECT TO GITHUB
// =====================================================
const moreProjectBtn = document.getElementById("btnMoreProject");
if (moreProjectBtn) {
  moreProjectBtn.addEventListener("click", function () {
    window.open("https://github.com/RendiS10", "_blank");
  });
}

// =====================================================
// 10. ADD FADE-IN ANIMATION
// =====================================================
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// =====================================================
// 11. LAZY LOAD IMAGES (for better performance)
// =====================================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
