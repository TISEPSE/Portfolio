const cards = document.querySelectorAll(".card");
const modal = document.getElementById("projectModal");
const modalImage = modal.querySelector(".modal-image");
const modalTitle = modal.querySelector(".modal-title");
const modalDescription = modal.querySelector(".modal-description");
const closeButton = modal.querySelector(".close");

cards.forEach(card => {
  card.addEventListener("click", () => {
    modalImage.src = card.querySelector("img").src;
    modalTitle.textContent = card.querySelector("h2").textContent;
    modalDescription.textContent = card.querySelector("p").textContent;
    modal.classList.add("show");
  });

  // Récupérer le bouton GitHub et son lien
  const githubButton = card.querySelector(".githubButton");
  if (githubButton) {
    githubButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche l'ouverture de la modale
      const link = githubButton.getAttribute("data-link"); // Récupère l'URL du bouton
      if (link) {
        window.open(link, "_blank");
      }
    });
  }
});

// Fermer la modale lorsqu'on clique sur le bouton de fermeture
closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
});

window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});