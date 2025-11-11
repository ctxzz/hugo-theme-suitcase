/**
 * Theme toggle functionality
 * Switches between dark and light modes
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'suitcase-theme';
  const DARK_MODE = 'dark-mode';
  const LIGHT_MODE = 'light-mode';

  // Get stored theme preference or default to dark mode
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DARK_MODE;
    } catch (e) {
      return DARK_MODE;
    }
  }

  // Store theme preference
  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Unable to store theme preference');
    }
  }

  // Apply theme to body
  function applyTheme(theme) {
    document.body.classList.remove(DARK_MODE, LIGHT_MODE);
    document.body.classList.add(theme);

    // Update toggle button icon
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      const icon = toggleButton.querySelector('.toggle-icon');
      if (icon) {
        icon.textContent = theme === DARK_MODE ? '🌙' : '☀️';
      }
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = document.body.classList.contains(DARK_MODE) ? DARK_MODE : LIGHT_MODE;
    const newTheme = currentTheme === DARK_MODE ? LIGHT_MODE : DARK_MODE;

    applyTheme(newTheme);
    storeTheme(newTheme);

    // Dispatch event for other scripts that might need to react to theme change
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
  }

  // Initialize theme on page load
  function initTheme() {
    const storedTheme = getStoredTheme();
    applyTheme(storedTheme);

    // Set up toggle button
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }

    // Optional: Listen for system theme changes
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

      darkModeQuery.addEventListener('change', (e) => {
        // Only apply system preference if user hasn't explicitly chosen a theme
        const hasStoredPreference = localStorage.getItem(STORAGE_KEY);
        if (!hasStoredPreference) {
          const theme = e.matches ? DARK_MODE : LIGHT_MODE;
          applyTheme(theme);
        }
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Expose toggle function globally for manual triggering if needed
  window.toggleSuitcaseTheme = toggleTheme;
})();
