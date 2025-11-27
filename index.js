// === Scroll Reveal for Skill Cards ===
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
// Smooth scrolling
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

// Animated counter
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
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number");
      counters.forEach((counter) => {
        if (counter.textContent === "0") {
          animateCounter(counter);
        }
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  observer.observe(statsSection);
}

// Form submission
function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  alert(
    `Terima kasih ${data.name}! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda di ${data.email}`
  );
  e.target.reset();
}

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(255, 255, 255, 0.98)";
    nav.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    nav.style.background = "rgba(255, 255, 255, 0.95)";
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});

// Skill bars animation on scroll
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll(".skill-progress");
        progressBars.forEach((bar) => {
          bar.style.width = bar.style.width;
        });
      }
    });
  },
  { threshold: 0.5 }
);

const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  skillObserver.observe(skillsSection);
}
const buttons = document.querySelectorAll(".cert-filters button");
const cards = document.querySelectorAll(".cert-card");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-filter");

    cards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
