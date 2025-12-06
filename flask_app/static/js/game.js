const images = [
    "/static/images/carteAccess.png",
    "/static/images/carteLinux.png",
    "/static/images/carteRecond.png",
    "/static/images/catePedago.png"
];

// Duplique les images pour créer des paires
let cards = [...images, ...images];
cards.sort(() => Math.random() - 0.5);

const game = document.querySelector(".memory-game");
let firstCard = null;
let lock = false;
let matchedPairs = 0;

// Génère les cartes
cards.forEach(src => {
    const card = document.createElement("div");
    card.classList.add("memory-card");

    card.innerHTML = `
        <img class="front" src="${src}">
        <div class="back"></div>
    `;

    card.addEventListener("click", () => flipCard(card));
    game.appendChild(card);
});

function flipCard(card) {
    if (lock || card === firstCard) return;
    card.classList.add("flip");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    checkMatch(card);
}

function checkMatch(secondCard) {
    lock = true;

    const img1 = firstCard.querySelector(".front").src;
    const img2 = secondCard.querySelector(".front").src;

    if (img1 === img2) {
        matchedPairs += 1;
        firstCard = null;
        lock = false;

        if (matchedPairs === images.length) {
            showFinalImage();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            firstCard = null;
            lock = false;
        }, 700);
    }
}

function showFinalImage() {
    const game = document.querySelector(".memory-game");
    game.innerHTML = "";

    const container = document.getElementById("final-image");
    container.innerHTML = "";
    container.style.display = "flex";

    // ✅ FORÇAGE DU CENTRAGE DIRECTEMENT EN JS (IMPOSSIBLE À CASSER)
    container.style.position = "fixed";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.zIndex = "1000";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";

    // 🎉 Confettis
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });

    const link = document.createElement("a");
    link.href = "/FRISE";

    const finalImage = document.createElement("img");
    finalImage.src = "/static/images/trophy.jpg";

    // ✅ FORÇAGE TAILLE MOBILE
    finalImage.style.width = "200px";
    finalImage.style.maxWidth = "80vw";
    finalImage.style.height = "auto";

    link.appendChild(finalImage);
    container.appendChild(link);
}

