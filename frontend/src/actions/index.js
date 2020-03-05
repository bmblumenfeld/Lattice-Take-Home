import { API_BASE_URL } from "../constants.js";

export const actionTypes = {
  fetchPopularMovies: "FETCH_POP_MOVIES"
};

export const fetchPopularMovies = () => async dispatch => {
  try {
    const response = await fetch(`${API_BASE_URL}/popular`);
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
