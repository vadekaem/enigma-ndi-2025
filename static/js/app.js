const slides = document.querySelectorAll(".slide");
const total = slides.length;
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let index = 0;
let autoSlideInterval;

// Activation de la première image
slides[index].classList.add("active");

// ===============================
// FONCTION D’AFFICHAGE
// ===============================
function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

// ===============================
// DÉFILEMENT AUTOMATIQUE
// ===============================
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    index = (index + 1) % total;
    showSlide(index);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// ===============================
// FLÈCHE DROITE
// ===============================
nextBtn.addEventListener("click", () => {
  index = (index + 1) % total;
  showSlide(index);
  resetAutoSlide();
});

// ===============================
// FLÈCHE GAUCHE
// ===============================
prevBtn.addEventListener("click", () => {
  index = (index - 1 + total) % total;
  showSlide(index);
  resetAutoSlide();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    index = (index + 1) % total;
    showSlide(index);
    resetAutoSlide();
  }

  if (e.key === "ArrowLeft") {
    index = (index - 1 + total) % total;
    showSlide(index);
    resetAutoSlide();
  }
});

// ===============================
// LANCEMENT
// ===============================
startAutoSlide();
