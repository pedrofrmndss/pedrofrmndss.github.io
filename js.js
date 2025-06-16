
// Filtrer les projets

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  const cardsFilter = (e) => {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    e.target.classList.add('active');

    const filterValue = e.target.getAttribute('data-filter');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.classList.remove('filtre');
      } else {
        card.classList.add('filtre');
      }
    });
  };

  filterButtons.forEach(button => {
    button.addEventListener('click', cardsFilter);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");

  // Clone les cartes pour un effet infini
  function duplicateCards() {
    const cards = [...carousel.children];
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      carousel.appendChild(clone);
    });
  }

  duplicateCards();

  let position = 0;
  const speed = 1.5; // ajustable
  let animationId;

  function scroll() {
    position -= speed;
    if (Math.abs(position) >= carousel.scrollWidth / 2) {
      position = 0; // Remise à zéro pour boucler
    }
    carousel.style.transform = `translateX(${position}px)`;
    animationId = requestAnimationFrame(scroll);
  }

  scroll(); // démarrer l'animation

  // Pause au survol
  carousel.addEventListener("mouseenter", () => {
    cancelAnimationFrame(animationId);
  });

  carousel.addEventListener("mouseleave", () => {
    scroll();
  });
});


