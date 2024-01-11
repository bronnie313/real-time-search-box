document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    let typingTimer;
  
    searchInput.addEventListener('input', () => {
      clearTimeout(typingTimer);
  
      typingTimer = setTimeout(() => {
        const query = searchInput.value.trim();
  
        if (query !== '') {
          fetch(`/api/v1/search/suggestions?suggest_query=${query}`)
            .then(response => response.json())
            .then(data => {
              renderSuggestions(data.suggestions);
            })
            .catch(error => console.error('Error fetching suggestions:', error));
        }
      }, 200); 
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
          suggestionsContainer.innerHTML = '';
        }
      });
  
    function renderSuggestions(suggestions) {
      suggestionsContainer.innerHTML = '';
  
      const ul = document.createElement('ul');
  
      suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        ul.appendChild(li);
      });
  
      suggestionsContainer.appendChild(ul);
    }
  });
  