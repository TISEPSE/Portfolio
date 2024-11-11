// Sélectionnez votre première carte et la modale
const firstCard = document.querySelector(".card")
const modal = document.getElementById("myModal")
const closeBtn = document.querySelector(".close")

// Ouvrir la modale quand on clique sur la première carte
firstCard.addEventListener("click", () => {
  modal.classList.add("show")
})

// Fermer la modale quand on clique sur le bouton de fermeture
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show")
})

// Fermer la modale si on clique en dehors du contenu
window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.remove("show")
  }
})
