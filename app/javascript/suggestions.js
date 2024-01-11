document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    let typingTimer;
  
    // Add an event listener for the input event on the search input
    searchInput.addEventListener('input', () => {
      clearTimeout(typingTimer);
  
      // Set a timeout to wait for the user to stop typing
      typingTimer = setTimeout(() => {
        const query = searchInput.value.trim();
  
        // Fetch suggestions only if the query is not empty
        if (query !== '') {
          fetch(`/api/v1/search/suggestions?suggest_query=${query}`)
            .then(response => response.json())
            .then(data => {
              // Update the content of the suggestions container
              renderSuggestions(data.suggestions);
            })
            .catch(error => console.error('Error fetching suggestions:', error));
        }
      }, 500); // Adjust the delay as needed
    });
  
    // Function to render suggestions in the HTML
    function renderSuggestions(suggestions) {
      // Clear existing content
      suggestionsContainer.innerHTML = '';
  
      // Create a list element to display suggestions
      const ul = document.createElement('ul');
  
      // Iterate through suggestions and create list items
      suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        ul.appendChild(li);
      });
  
      // Append the list to the container
      suggestionsContainer.appendChild(ul);
    }
  });
  