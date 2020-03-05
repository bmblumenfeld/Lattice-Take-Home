const fetch = require("node-fetch");
const { MOVIE_DB_API_KEY } = require("./config.js");

const getPopularMovies = async (pageNumber = 1) => {
  const popularQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`;
  try {
    const response = await fetch(popularQuery);
    if (!response.ok) {
      throw "Bad request to MovieDB";
    }
    const resBody = await response.json();
    const popularMovies = resBody.results;
    return popularMovies;
  } catch (error) {
    throw error;
  }
};

const getMoviesFromSearch = async (searchTerm, pageNumber = 1) => {
  const searchQuery = `https://api.themoviedb.org/3/search/movie?api_key=28bd402a0e9e028a11e0076c5f8f3d86&language=en-US&query=${searchTerm}&page=${pageNumber}&include_adult=false`;
  try {
    const response = await fetch(searchQuery);
    if (!response.ok) {
      throw "Bad request to MovieDB";
    }
    const resBody = await response.json();
    const searchResults = resBody.results;
    return searchResults;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPopularMovies,
  getMoviesFromSearch
};
