/**
 * Search functionality using Fuse.js
 * Searches through the site's knowledge base
 */

(function() {
  'use strict';

  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchInput || !searchResults) {
    return;
  }

  let fuse = null;
  let searchIndex = [];

  // Load search index
  async function loadSearchIndex() {
    try {
      // Try multiple paths for index.json
      let response;
      const paths = ['/index.json', './index.json', window.location.pathname + 'index.json'];

      for (const path of paths) {
        try {
          response = await fetch(path);
          if (response.ok) break;
        } catch (e) {
          continue;
        }
      }

      if (!response || !response.ok) {
        console.error('Failed to load search index from any path');
        return;
      }
      searchIndex = await response.json();

      // Initialize Fuse.js with the search index
      const fuseOptions = {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'summary', weight: 0.3 },
          { name: 'tags', weight: 0.1 },
          { name: 'topics', weight: 0.1 }
        ],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
        ignoreLocation: true
      };

      // Check if Fuse is available (CDN or local)
      if (typeof Fuse !== 'undefined') {
        fuse = new Fuse(searchIndex, fuseOptions);
      } else {
        console.warn('Fuse.js not loaded. Search functionality will be limited.');
        // Fallback to simple search
        fuse = null;
      }
    } catch (error) {
      console.error('Error loading search index:', error);
    }
  }

  // Simple fallback search (without Fuse.js)
  function simpleSearch(query) {
    const lowerQuery = query.toLowerCase();
    return searchIndex
      .filter(item => {
        return (
          item.title.toLowerCase().includes(lowerQuery) ||
          (item.summary && item.summary.toLowerCase().includes(lowerQuery)) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) ||
          (item.topics && item.topics.some(topic => topic.toLowerCase().includes(lowerQuery)))
        );
      })
      .slice(0, 10)
      .map(item => ({ item }));
  }

  // Perform search
  function performSearch(query) {
    if (!query || query.trim().length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    let results;
    if (fuse) {
      results = fuse.search(query).slice(0, 10);
    } else {
      results = simpleSearch(query);
    }

    displayResults(results);
  }

  // Display search results
  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<li style="padding: 1rem; color: #888;">検索結果が見つかりませんでした</li>';
      return;
    }

    const html = results
      .map(result => {
        const item = result.item;
        let metaInfo = '';

        if (item.topics && item.topics.length > 0) {
          metaInfo += `<span style="font-size: 0.8rem; color: #888;">📂 ${item.topics.slice(0, 2).join(', ')}</span>`;
        }

        return `
          <li>
            <a href="${item.permalink}">
              <div style="font-weight: 500; margin-bottom: 0.25rem;">${item.title}</div>
              ${metaInfo}
              ${item.summary ? `<div style="font-size: 0.85rem; color: #999; margin-top: 0.25rem;">${item.summary.substring(0, 100)}...</div>` : ''}
            </a>
          </li>
        `;
      })
      .join('');

    searchResults.innerHTML = html;
  }

  // Debounce function to limit search frequency
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Event listeners
  const debouncedSearch = debounce(performSearch, 300);

  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length >= 2) {
      performSearch(searchInput.value);
    }
  });

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.innerHTML = '';
    }
  });

  // Handle keyboard navigation
  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('li');
    if (items.length === 0) return;

    let currentIndex = -1;
    items.forEach((item, index) => {
      if (item.classList.contains('active')) {
        currentIndex = index;
      }
    });

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentIndex < items.length - 1) {
        if (currentIndex >= 0) items[currentIndex].classList.remove('active');
        items[currentIndex + 1].classList.add('active');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentIndex > 0) {
        items[currentIndex].classList.remove('active');
        items[currentIndex - 1].classList.add('active');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentIndex >= 0) {
        const link = items[currentIndex].querySelector('a');
        if (link) link.click();
      }
    }
  });

  // Initialize
  loadSearchIndex();

  // Optional: Load Fuse.js from CDN if not already loaded
  if (typeof Fuse === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js';
    script.onload = () => {
      if (searchIndex.length > 0) {
        const fuseOptions = {
          keys: [
            { name: 'title', weight: 0.5 },
            { name: 'summary', weight: 0.3 },
            { name: 'tags', weight: 0.1 },
            { name: 'topics', weight: 0.1 }
          ],
          threshold: 0.3,
          includeScore: true,
          minMatchCharLength: 2,
          ignoreLocation: true
        };
        fuse = new Fuse(searchIndex, fuseOptions);
      }
    };
    document.head.appendChild(script);
  }
})();
