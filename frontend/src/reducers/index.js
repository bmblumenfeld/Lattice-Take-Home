import { combineReducers } from "redux";
import { actionTypes } from "../actions";

const popularMoviesReducer = (state = [], action) => {
  console.log(action, "swifty");
  switch (action.type) {
    case actionTypes.fetchPopularMovies:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  popularMovies: popularMoviesReducer
});
