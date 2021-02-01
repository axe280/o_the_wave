document.addEventListener('DOMContentLoaded', () => {
  const pushSpace = 450;
  let lazyloadThrottleTimeout;

  const lazyLoad = () => {
    const lazyLoadImages = document.querySelectorAll('img.lazy');

    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(() => {
      var scrollTop = window.pageYOffset;
      lazyLoadImages.forEach((img) => {
        if (img.offsetTop < (window.innerHeight + scrollTop + pushSpace)) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
      });

      if (lazyLoadImages.length == 0) {
        document.removeEventListener('scroll', lazyLoad);
        window.removeEventListener('resize', lazyLoad);
        window.removeEventListener('orientationChange', lazyLoad);
      }
    }, 20);
  }

  document.addEventListener('scroll', lazyLoad);
  window.addEventListener('resize', lazyLoad);
  window.addEventListener('orientationChange', lazyLoad);
});