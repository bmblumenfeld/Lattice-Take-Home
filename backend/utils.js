const fetch = require("node-fetch");
const { MOVIE_DB_API_KEY } = require("./config.js");

const getPopularMovies = async (pageNumber = 1) => {
  const popularQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`;
  try {
    const response = await fetch(popularQuery);
    if (!response.ok) {
      throw "Bad request to MovieDB";
    }
    const popularMovies = await response.json();
    return popularMovies;
  } catch (error) {
    throw error;
  }
};

const getMoviesFromSearch = async (searchTerm = "", pageNumber = 1) => {
  const searchQuery = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_API_KEY}&language=en-US&query=${searchTerm}&page=${pageNumber}&include_adult=false`;
  try {
    const response = await fetch(searchQuery);
    if (!response.ok) {
      throw "Bad request to MovieDB";
    }
    const searchResults = await response.json();
    return searchResults;
  } catch (error) {
    throw error;
  }
};

const getTrendingMovies = async () => {
  const trendingQuery = `https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIE_DB_API_KEY}`;
  try {
    const response = await fetch(trendingQuery);
    if (!response.ok) {
      throw "Bad request to MovieDB";
    }
    const trendingMovies = await response.json();
    return trendingMovies;
  } catch (error) {
    throw error;
  }
};

const getAllMovies = async (pageNumber = 1) => {
  const allQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_DB_API_KEY}&language=en-US&sort_by=original_title.asc&include_adult=false&include_video=false&page=${pageNumber}`;
  try {
    const response = await fetch(allQuery);
    if (!response.ok) {
      throw "Bad request to MovieDB";
    }
    const allMovies = await response.json();
    return allMovies;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPopularMovies,
  getMoviesFromSearch,
  getTrendingMovies,
  getAllMovies
};
