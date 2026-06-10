document.addEventListener("DOMContentLoaded", () => {
  const slideshowImages = document.querySelectorAll(".slideshow-container img");
  let currentIndex = 0;

  function changeSlide() {
    slideshowImages[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slideshowImages.length;
    slideshowImages[currentIndex].classList.add("active");
  }

  setInterval(changeSlide, 5000); // Change every 4 seconds

  // Scroll animation for paragraphs
  const summaryParagraphs = document.querySelectorAll(".summary-paragraph");

  function handleScroll() {
    summaryParagraphs.forEach((paragraph) => {
      const rect = paragraph.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100 && rect.bottom >= 0) {
        paragraph.classList.add("visible");
      } else {
        paragraph.classList.remove("visible");
      }
    });
    setInterval(handleScroll, 1400);
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger animation on load
});
