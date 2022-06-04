import anime from 'animejs/lib/anime.es.js';

function observerCallback(entries, observer) {
  entries.forEach(entry => {
    const entryActivated = entry.target.classList.contains('mock_activated');
    if (entry.isIntersecting && !entryActivated) {
      anime({
        targets: entry.target,
        translateY: ['10%', 0],
        opacity: [0, 1],
        easing: 'easeInOutQuart',
        duration: 1000,
      });

      entry.target.classList.add('mock_activated');
    }
  });
}


let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 0.5
}

let observer = new IntersectionObserver(observerCallback, options);

export default () => {
  const mockEls = document.querySelectorAll('.mock');
  mockEls.forEach(mock => observer.observe(mock));
};
