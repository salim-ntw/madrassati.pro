import React from 'react';

export function useScrollReveal(selector = '.reveal', options = {}) {
  const defaultOptions = { threshold: 0.15, rootMargin: '0px' };
  const opts = { ...defaultOptions, ...options };

  React.useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, opts);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, opts.threshold, opts.rootMargin]);
}




