function setupCarousel(carousel) {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const prevButton = carousel.querySelector(".carousel-arrow.prev");
  const nextButton = carousel.querySelector(".carousel-arrow.next");

  let currentIndex = slides.findIndex((slide) => slide.classList.contains("active"));
  if (currentIndex === -1) currentIndex = 0;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
    return dot;
  });

  function render() {
    slides.forEach((slide, index) => slide.classList.toggle("active", index === currentIndex));
    dots.forEach((dot, index) => dot.classList.toggle("active", index === currentIndex));
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    render();
    restartAutoplay();
  }

  prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));

  let autoplay;
  function restartAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => goToSlide(currentIndex + 1), 6000);
  }

  carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
  carousel.addEventListener("mouseleave", restartAutoplay);

  render();
  restartAutoplay();
}

document.querySelectorAll(".carousel").forEach(setupCarousel);

function setupResumeToggle() {
  const toggle = document.querySelector(".resume-toggle");
  if (!toggle) return;

  const resumes = {
    "tech-sales": {
      title: "Gabriel Freedberg Tech Sales",
      file: "/resumes/gabriel-freedberg-tech-sales.pdf",
    },
    engineering: {
      title: "Gabriel Freedberg Engineering",
      file: "/resumes/gabriel-freedberg-engineering.pdf",
    },
  };

  const buttons = Array.from(toggle.querySelectorAll(".resume-toggle-btn"));
  const preview = document.querySelector(".resume-preview");
  const title = document.querySelector(".resume-title");
  const download = document.querySelector(".resume-download");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const resume = resumes[button.dataset.resume];
      buttons.forEach((b) => {
        b.classList.toggle("active", b === button);
        b.setAttribute("aria-selected", b === button);
      });
      preview.src = resume.file;
      title.textContent = resume.title;
      download.href = resume.file;
      download.setAttribute("download", `${resume.title}.pdf`);
    });
  });
}

setupResumeToggle();
