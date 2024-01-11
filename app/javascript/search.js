document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    let typingTimer; 

    searchInput.addEventListener('input', (event) => {
        const userInput = event.target.value;

        clearTimeout(typingTimer);

        typingTimer = setTimeout(() => {
            if (userInput.trim() !== '') {
                fetch('http://127.0.0.1:3000/api/v1/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        search_query: userInput
                    })
                })
                .then(res => {
                    if (res.ok) {
                        console.log('Query sent');
                        // location.reload()
                    } else {
                        console.error('Error:', res.status);
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                })
            }
        }, 5000);
    });
});
  