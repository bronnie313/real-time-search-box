document.addEventListener('DOMContentLoaded', () => {
    const topSearchesContainer = document.getElementById('topSearchesContainer');
    const searchInput = document.getElementById('searchInput');
    let typingTimer;
  
    function fetchAndRenderTopSearches(query = '') {
      fetch(`/api/v1/search/top_searches?query=${query}`)
        .then(response => response.json())
        .then(data => {
          renderTopSearches(data.top_searches);
        })
        .catch(error => console.error('Error fetching top searches:', error));
    }
  
    function renderTopSearches(topSearches) {
      topSearchesContainer.innerHTML = '';
  
      const ul = document.createElement('ul');
  
      topSearches.forEach(search => {
        const li = document.createElement('li');
        li.textContent = `${search.search_query} - ${search.query_count} searches`;
        ul.appendChild(li);
      });
  
      topSearchesContainer.appendChild(ul);
    }
  
    fetchAndRenderTopSearches();
  
    searchInput.addEventListener('input', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => fetchAndRenderTopSearches(searchInput.value.trim()), 1000);
    });
  });
  