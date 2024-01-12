document.addEventListener('DOMContentLoaded', () => {
    const recentSearchesContainer = document.getElementById('recentSearchesContainer');
    const searchInput = document.getElementById('searchInput');
    let typingTimer;
  
    fetchRecentSearches();
  
    searchInput.addEventListener('input', () => {
      clearTimeout(typingTimer);
  
      typingTimer = setTimeout(() => {
        const query = searchInput.value.trim();
  
        if (query !== '') {
          fetchRecentSearches(query);
        }
      }, 500);
    });
  
    function fetchRecentSearches(query = '') {
      fetch(`/api/v1/search/recent_searches?query=${query}`)
        .then(response => response.json())
        .then(data => {
         console.log('API Response:', data);
          renderRecentSearches(data.recent_searches);
        })
        .catch(error => console.error('Error fetching recent searches:', error));
    }
  
    function renderRecentSearches(recentSearches) {
      recentSearchesContainer.innerHTML = '';
  
      const ul = document.createElement('ul');
  
      recentSearches.forEach(search => {
        const li = document.createElement('li');
        const createdAt = new Date(search.created_at).toLocaleString();
        li.textContent = `${search.search_query} - Created at: ${createdAt}`;
        ul.appendChild(li);
      });
  
      recentSearchesContainer.appendChild(ul);
    }
});
  
