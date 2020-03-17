import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MovieList from "./components/MovieList.js";

const mockMovie = {
  title: "fake-Movie",
  poster_path: "fake/path",
  vote_average: 4.5,
  overview: "this is a fake movie"
};
const initialState = {
  allTimePopularMovies: [mockMovie],
  trendingMovies: [mockMovie],
  searchMovies: [mockMovie],
  allMovies: [mockMovie],
  displayType: "trending",
  selectedMovie: mockMovie,
  searchTerm: ""
};

const mockStore = configureStore();
describe("<MovieList />", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  test("renders with default state", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MovieList movies={store.getState().trendingMovies} />
        </Provider>
      )
      .toJSON();
    expect(tree.children).toBeTruthy();
  });
});
