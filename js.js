
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


// carousel infini
const carousel = document.querySelector('.carousel');

        function duplicateCards() {
            const cards = [...carousel.children];
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                carousel.appendChild(clone);
            });
        }

        function startInfiniteScroll() {
            let position = 0;
            const speed = 2; // Plus grand = plus rapide
            function scroll() {
                position -= speed;
                if (Math.abs(position) >= carousel.scrollWidth / 2) {
                    position = 0; // Reset propre pour un effet infini
                }
                carousel.style.transform = `translateX(${position}px)`;
                requestAnimationFrame(scroll);
            }
            scroll();
        }

        duplicateCards();

        sliderElement.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        sliderElement.addEventListener('mouseleave', () => {
            slideInterval = setInterval(moveToNextSlide, 1000);
        });




        
        // Filtrer les projets

        //responsive 
  document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".right").classList.toggle("open");
  });

