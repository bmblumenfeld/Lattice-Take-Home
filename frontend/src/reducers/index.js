import { combineReducers } from "redux";
import { actionTypes } from "../actions";
import { displayTypes } from "../constants";

const DEFAULT_DISPLAY_TYPE = displayTypes.trending;

const allTimePopularMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.fetchPopularMovies:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const trendingMovieReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.fetchTrendingMovies:
      return action.payload;
    default:
      return state;
  }
};

const allMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.fetchAllMovies:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const searchMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.fetchSearchMovies:
      return action.payload;
    default:
      return state;
  }
};

const selectMovieReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.selectMovie:
      return action.payload.movie;
    case actionTypes.fetchTrendingMovies:
      if (!state) {
        return action.payload[0];
      }
      return state;
    default:
      return state;
  }
};

const setSearchReducer = (state = "", action) => {
  switch (action.type) {
    case actionTypes.setSearch:
      return action.payload.searchTerm;
    case actionTypes.selectDisplayType:
      if (action.payload.displayType === displayTypes.search) {
        return state;
      }
      return "";
    default:
      return state;
  }
};

const setDisplayTypeReducer = (state = DEFAULT_DISPLAY_TYPE, action) => {
  switch (action.type) {
    case actionTypes.selectDisplayType:
      return action.payload.displayType;
    default:
      return state;
  }
};

export default combineReducers({
  allTimePopularMovies: allTimePopularMoviesReducer,
  trendingMovies: trendingMovieReducer,
  searchMovies: searchMoviesReducer,
  selectedMovie: selectMovieReducer,
  allMovies: allMoviesReducer,
  searchTerm: setSearchReducer,
  displayType: setDisplayTypeReducer
});
