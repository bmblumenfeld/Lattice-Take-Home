import React from "react";
import MovieList from "./components/MovieList";
import { COLORS, displayTypes } from "./constants";
import MovieDetailView from "./components/Movie";
import { fetchTrendingMovies } from "../src/actions";
import { connect } from "react-redux";
import DisplayToggles from "./components/DisplayToggles";
import SearchBar from "./components/SearchBar";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchTrendingMovies();
  }

  getMoviesToDisplay() {
    const {
      trendingMovies,
      searchMovies,
      allTimePopularMovies,
      allMovies,
      displayType
    } = this.props;
    switch (displayType) {
      case displayTypes.trending:
        return trendingMovies;
      case displayTypes.allTime:
        return allTimePopularMovies;
      case displayTypes.all:
        return allMovies;
      case displayTypes.search:
        return searchMovies;
      default:
        return trendingMovies;
    }
  }

  render() {
    return (
      <div style={styles.appContainer}>
        <SearchBar />
        <DisplayToggles />
        <div style={styles.movieViewContainer}>
          <MovieDetailView />
          <MovieList movies={this.getMoviesToDisplay()} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allTimePopularMovies: state.allTimePopularMovies,
    trendingMovies: state.trendingMovies,
    searchMovies: state.searchMovies,
    allMovies: state.allMovies,
    displayType: state.displayType
  };
};

export default connect(mapStateToProps, {
  fetchTrendingMovies
})(App);

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
    width: "60vw",
    position: "absolute",
    top: "10%",
    left: "20%",
    alignSelf: "center",
    border: "2px",
    borderStyle: "solid",
    borderColor: COLORS.gray200,
    borderRadius: "5px"
  },
  movieViewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%"
  }
};
