document.addEventListener("DOMContentLoaded", () => {
  // Welcome button: cycles through a few messages on each click
  const welcomeButton = document.getElementById("welcomeButton");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const greetings = [
    "Hello! Glad you stopped by.",
    "Keep going, you're learning fast!",
    "Every click is an event listener at work.",
    "Thanks for exploring my hub!"
  ];
  let greetingIndex = 0;

  welcomeButton.addEventListener("click", () => {
    welcomeMessage.textContent = greetings[greetingIndex];
    greetingIndex = (greetingIndex + 1) % greetings.length;
  });

  // Lesson cards: show or hide extra details
  document.querySelectorAll(".toggle-details").forEach((button) => {
    button.addEventListener("click", () => {
      const details = button.nextElementSibling;
      const isHidden = details.hidden;

      details.hidden = !isHidden;
      button.textContent = isHidden ? "Show less" : "Show more";
      button.setAttribute("aria-expanded", String(isHidden));
    });
  });

  // Highlight the nav link for the section currently in view
  const navLinks = document.querySelectorAll(".site-nav a");
  const sections = document.querySelectorAll("main .section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));

  // Contact form: validate before "sending"
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const formMessage = document.getElementById("formMessage");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 2) {
      nameError.textContent = "Please enter at least 2 characters.";
      nameInput.classList.add("invalid");
      return false;
    }
    nameError.textContent = "";
    nameInput.classList.remove("invalid");
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!emailPattern.test(value)) {
      emailError.textContent = "Please enter a valid email address.";
      emailInput.classList.add("invalid");
      return false;
    }
    emailError.textContent = "";
    emailInput.classList.remove("invalid");
    return true;
  }

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameOk = validateName();
    const emailOk = validateEmail();

    if (!nameOk || !emailOk) {
      formMessage.textContent = "Please fix the errors above.";
      formMessage.className = "message error";
      return;
    }

    formMessage.textContent = `Thanks, ${nameInput.value.trim()}! Your message has been noted.`;
    formMessage.className = "message success";
    form.reset();
  });
});