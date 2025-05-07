document.addEventListener('DOMContentLoaded', function () {
    const lazyBackgrounds = document.querySelectorAll('.lazy-background');
  
    if ('IntersectionObserver' in window) {
      const lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const lazyBackground = entry.target;
            const bgUrl = lazyBackground.getAttribute('data-background-image');
            if (bgUrl) {
              lazyBackground.style.backgroundImage = `url('${bgUrl}')`;
              lazyBackground.classList.remove('lazy-background');
            }
            lazyBackgroundObserver.unobserve(lazyBackground);
          }
        });
      });
  
      lazyBackgrounds.forEach(function(lazyBackground) {
        lazyBackgroundObserver.observe(lazyBackground);
      });
    } else {
      // Fallback nếu không hỗ trợ IntersectionObserver
      lazyBackgrounds.forEach(function(lazyBackground) {
        const bgUrl = lazyBackground.getAttribute('data-background-image');
        if (bgUrl) {
          lazyBackground.style.backgroundImage = `url('${bgUrl}')`;
          lazyBackground.classList.remove('lazy-background');
        }
      });
    }
  });
  