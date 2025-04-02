// Hide loader after page loads
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").classList.add("hidden");
  }, 1000);
});

// Initialize AOS animations with improved settings
AOS.init({
  // duration: 600,
  // easing: "ease-out",
  // once: true, // Elements will only animate once
  // offset: 50, // Offset (in px) from the original trigger point
  // delay: 0,
  // mirror: false, // Whether elements should animate out while scrolling past them
  // anchorPlacement: "top-bottom", // Defines which position of the element regarding to window should trigger the animation
});

// Mobile menu toggle
const hamburger = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.classList.toggle("overflow-hidden");
});

// Close mobile menu when clicking a link
const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-opacity-90", "backdrop-blur-md", "shadow-lg");
    navbar.classList.remove("border-b", "border-gray-800");
  } else {
    navbar.classList.remove("bg-opacity-90", "backdrop-blur-md", "shadow-lg");
    navbar.classList.add("border-b", "border-gray-800");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Offset for fixed navbar
      const navbarHeight = document.querySelector("nav").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// FAQ accordion functionality
const faqToggles = document.querySelectorAll(".faq-toggle");

faqToggles.forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const content = this.nextElementSibling;
    const icon = this.querySelector("svg");

    // Toggle current FAQ
    content.classList.toggle("hidden");

    // Rotate icon
    if (content.classList.contains("hidden")) {
      icon.style.transform = "rotate(0deg)";
    } else {
      icon.style.transform = "rotate(180deg)";
    }

    // Add animation to content
    if (!content.classList.contains("hidden")) {
      content.style.maxHeight = "0";
      setTimeout(() => {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.transition = "max-height 0.3s ease-in-out";
      }, 10);
    } else {
      content.style.maxHeight = null;
    }
  });
});

// form image preview
document.getElementById("upload-image").addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      console.log(e);
      const imagePreview = document.getElementById("image-preview");
      const iconContainer = document.getElementById("icon-container");
      const fileInfo = document.getElementById("file-info");

      imagePreview.src = e.target.result;
      imagePreview.classList.remove("hidden");
      iconContainer.classList.add("hidden");
      fileInfo.innerText = file.name;
    };
    reader.readAsDataURL(file);
  }
});

// Form input animations
const formInputs = document.querySelectorAll("input, textarea");

//   formInputs.forEach((input) => {
//     input.addEventListener("focus", function () {
//       this.parentElement.classList.add("scale-105");
//       this.classList.add("border-primary");
//     });

//     input.addEventListener("blur", function () {
//       this.parentElement.classList.remove("scale-105");
//       if (!this.value) {
//         this.classList.remove("border-primary");
//       }
//     });
//   });

// Reveal first FAQ item by default
if (faqToggles.length > 0) {
  setTimeout(() => {
    faqToggles[0].click();
  }, 1000);
}
