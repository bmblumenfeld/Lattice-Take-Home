import { API_BASE_URL } from "../constants.js";

export const actionTypes = {
  fetchPopularMovies: "FETCH_POP_MOVIES",
  fetchTrendingMovies: "FETCH_TRENDING_MOVIES",
  fetchSearchMovies: "FETCH_SEARCH_MOVIES",
  fetchAllMovies: "FETCH_ALL_MOVIES",
  selectMovie: "SELECT_MOVIE",
  selectDisplayType: "SELECT_DISPLAY_TYPE",
  setSearch: "SET_SEARCH"
};

export const fetchPopularMovies = (pageNumber = 1) => async dispatch => {
  try {
    const response = await fetch(`${API_BASE_URL}/popular?page=${pageNumber}`);
    const popularMovies = await response.json();
    dispatch({
      type: actionTypes.fetchPopularMovies,
      payload: popularMovies.data
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrendingMovies = () => async dispatch => {
  try {
    const response = await fetch(`${API_BASE_URL}/trending`);
    const trendingMovies = await response.json();
    dispatch({
      type: actionTypes.fetchTrendingMovies,
      payload: trendingMovies.data
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSearchMovies = (
  searchTerm,
  pageNumber = 1
) => async dispatch => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search?searchTerm=${searchTerm}&page=${pageNumber}`
    );
    const searchMovies = await response.json();
    dispatch({
      type: actionTypes.fetchSearchMovies,
      payload: searchMovies.data
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllMovies = (pageNumber = 1) => async dispatch => {
  try {
    const response = await fetch(`${API_BASE_URL}/all?page=${pageNumber}`);
    const allMovies = await response.json();
    dispatch({
      type: actionTypes.fetchAllMovies,
      payload: allMovies.data
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const selectMovie = movie => {
  return {
    type: actionTypes.selectMovie,
    payload: { movie }
  };
};

export const selectDisplayType = displayType => {
  return {
    type: actionTypes.selectDisplayType,
    payload: { displayType: displayType }
  };
};

export const setSearch = searchTerm => {
  return {
    type: actionTypes.setSearch,
    payload: { searchTerm }
  };
};
