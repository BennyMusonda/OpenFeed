document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove active class from all buttons and add to the clicked one
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 2. Get target category data attribute
      const targetCategory = button.getAttribute('data-category');

      // 3. Filter cards
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex'; // Keep flex alignment intact
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

