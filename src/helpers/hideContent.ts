import anime from 'animejs/lib/anime.es.js';

async function hideContent() {
  return new Promise(resolve => {
    anime({
      targets: 'main > div',
      translateY: [0, '10%'],
      opacity: [1, 0],
      easing: 'easeInOutQuart',
      duration: 1000,
      complete: () => {
        window.scrollTo(0, 0);
        resolve(true);
      },
    });
  });
}

export default hideContent;
