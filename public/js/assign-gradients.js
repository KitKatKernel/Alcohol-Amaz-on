document.addEventListener('DOMContentLoaded', function () {
    // Making an array of CSS gradient variables
    const gradients = [
      '--gradient-cambridge-brilliant-sunglow-90deg',
      '--gradient-cambridge-brilliant-sunglow-180deg',
      '--gradient-cambridge-brilliant-sunglow-270deg',
      '--gradient-cambridge-brilliant-sunglow-45deg',
      '--gradient-cambridge-brilliant-tea-90deg',
      '--gradient-cambridge-brilliant-tea-180deg',
      '--gradient-cambridge-brilliant-tea-270deg',
      '--gradient-cambridge-brilliant-tea-45deg',
      '--gradient-cambridge-sunglow-tea-90deg',
      '--gradient-cambridge-sunglow-tea-180deg',
      '--gradient-cambridge-sunglow-tea-270deg',
      '--gradient-cambridge-sunglow-tea-45deg',
      '--gradient-brilliant-sunglow-tea-90deg',
      '--gradient-brilliant-sunglow-tea-180deg',
      '--gradient-brilliant-sunglow-tea-270deg',
      '--gradient-brilliant-sunglow-tea-45deg'
    ];
  
    // We're gonna shuffle the gradient array
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    const shuffledGradients = shuffle([...gradients]);
  
    // Apply each shuffled gradient to a card
    const cards = document.querySelectorAll('.card-wrapper');
  
    cards.forEach((card, index) => {
      if (shuffledGradients[index]) {
        card.style.setProperty('--gradient', `var(${shuffledGradients[index]})`);
      }
    });
  });
  