const apiKey = 'YOUR_TMDB_API_KEY';
const baseUrl = 'https://api.themoviedb.org/3';

// Function to search for movies
function searchMovies(query) {
    const encodedQuery = encodeURIComponent(query);
    fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${encodedQuery}&language=en-US`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('movies-search');
            resultsContainer.innerHTML = ''; // Clear previous results

            if (data.results.length > 0) {
                displayMovies(data.results, 'movies-search');
            } else {
                resultsContainer.innerHTML = '<p>No movies found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            document.getElementById('movies-search').innerHTML = '<p>Failed to load movies. Please try again later.</p>';
        });
}

// Function to display movies
function displayMovies(movies, elementId) {
    const movieGrid = document.getElementById(elementId);
    movieGrid.innerHTML = ''; // Clear previous content

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        moviePoster.alt = movie.title;

        const movieTitle = document.createElement('h3');
        movieTitle.className = 'movie-title';
        movieTitle.innerText = movie.title;

        movieItem.appendChild(moviePoster);
        movieItem.appendChild(movieTitle);
        movieGrid.appendChild(movieItem);
    });
}

// Attach search functionality to the search button
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    searchMovies(query);
});
