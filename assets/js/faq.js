/* ─────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────── */
(function() {
  const toggles = document.querySelectorAll('.faq-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const content = toggle.nextElementSibling;

      // Close all other items
      toggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      toggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    });
  });
})();
