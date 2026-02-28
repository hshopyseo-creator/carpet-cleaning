document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  const revealTargets = document.querySelectorAll(".card, .service-block, .price-card, .testimonial-highlight, .form-card");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });

  const today = new Date();
  const isoDate = today.toISOString().split("T")[0];
  const bookingDate = document.querySelector("#bDate");
  if (bookingDate) {
    bookingDate.setAttribute("min", isoDate);
  }

  const attachValidation = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = "Please complete all required fields correctly.";
        return;
      }

      if (status) {
        status.textContent = "Thank you. Your request was submitted successfully.";
      }

      form.reset();
      if (bookingDate) bookingDate.setAttribute("min", isoDate);
    });
  };

  attachValidation("quoteForm");
  attachValidation("bookingForm");
});
