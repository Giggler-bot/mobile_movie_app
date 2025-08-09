export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }

}

// type FetchMoviesParams = {
//   query: string;
//   random?: boolean; // 👈 allow this optional param
// };
// export const fetchMovies = async({ query, random }: { FetchMoviesParams }) => {
//     const endpoint = query 
//         ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
//         : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`; 
    
    
//     const response = await fetch(endpoint, {
//         method: 'GET', 
//         headers: TMDB_CONFIG.headers,
    
//     });

//     if (!response.ok) {
//         throw new Error('Failed to fetch movies: ' + response.statusText);
//     }
       

//     const data = await response.json();
//     return data.results;
// }

type FetchMoviesParams = {
  query?: string;      // make optional so we can call with only random
  random?: boolean;    // optional
};

export const fetchMovies = async ({ query, random }: FetchMoviesParams) => {
  let endpoint: string;

  // If random is true, fetch a random page from discover
  if (random) {
    const randomPage = Math.floor(Math.random() * 50) + 1; // TMDB allows up to ~500 pages, adjust as needed
    endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${randomPage}`;
  } 
  // If there's a search query
  else if (query) {
    endpoint = `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
  } 
  // Default: popular movies
  else {
    endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  }

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movies: ' + response.statusText);
  }

  const data = await response.json();
  return data.results;
};


export const fetchMoviesDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if(!response) throw new Error('Failed to fetch movie details')
        
            const data = await response.json();

            return data;

    } catch(error) {
        console.log(error);
        throw error
    }
}